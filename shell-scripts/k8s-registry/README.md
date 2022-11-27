## Deploy Docker Registry

Create namespace
```sh
kubectl create namespace docker-registry
```

```sh
helm install docker-registry . \
  --namespace=docker-registry \
  --set ingress.host=registry.iguzman.com.mx
```

Delete deployment
```sh
helm delete docker-registry -n docker-registry
```
