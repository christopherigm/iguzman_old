# BACK

## Linux instructions

Linux does not need instructions ;)


## Windows instructions

### Install Python 

Get it form [here](https://www.python.org/downloads/)

### Download and install PIP

Get it form [here](https://bootstrap.pypa.io/get-pip.py)

Open a GitBash terminal as administrator and do:

```sh
python get-pip.py
```

Install virtualenvwrapper, virtualenv and supertools

```sh
python -m pip install virtualenv virtualenvwrapper supertools
```

### Create virtualenv

```sh
virtualenv.exe my_venv
```

This command will create a folder `venv` with the virtualenv inside of it.

To activate the virtualenv just do

```sh
source ./my_venv/Scripts/activate
```

To deactivate:

```sh
deactivate
```

### Backup database
```sh
kubectl exec -it <POD> \
/usr/local/bin/pg_dump nedii -U nedii > nedii.bak
```

### Restore database
```sh
kubectl cp nedii.bak <POD>:/ -n nedii
kubectl exec -it <POD> -n nedii -- /bin/sh
psql nedii -U nedii < /nedii.bak
```

### Production deployment

1) Build and publish Docker image
```sh
docker build -t nedii-api:latest . && \
docker tag nedii-api:latest christopherguzman/nedii-api:latest && \
docker push christopherguzman/nedii-api:latest
```

2) Create namespace
`kubectl create namespace nedii`

3) Deploy Postgres
```sh
helm install postgres-api deployment/postgres \
  --namespace=nedii \
  --set config.POSTGRES_DB=nedii \
  --set config.POSTGRES_USER=nedii \
  --set config.POSTGRES_PASSWORD=nedii
```

4) Deploy Nginx server
```sh
helm install nginx-api deployment/nginx \
  --namespace=nedii \
  --set apiName=nedii-api \
  --set volumeMountPath=shared-volume
```

5) Deploy microservice
```sh
helm install nedii-api deployment \
  --namespace=nedii \
  --set config.ENVIRONMENT=staging \
  --set config.BRANCH_NAME=integration \
  --set config.SECRET_KEY=123456 \
  --set config.DB_HOST=postgres-api.nedii.svc.cluster.local \
  --set config.DB_NAME=nedii \
  --set config.DB_USER=nedii \
  --set config.DB_PASSWORD=nedii \
  --set ingress.enabled=true \
  --set ingress.host=api.nedii.iguzman.com.mx
```

6) Delete deployments
```sh
helm delete nginx-api -n nedii && \
helm delete postgres-api -n nedii && \
helm delete nedii-api -n nedii
```
