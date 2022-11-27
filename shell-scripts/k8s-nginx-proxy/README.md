## Deploy Nginx proxy

Create namespace
```sh
kubectl create namespace my-nginx-proxy
```

```sh
helm install my-nginx-proxy . \
  --namespace=my-nginx-proxy \
  --set ingress.host=proxy.iguzman.com.mx \
  --set service.serverIP=192.168.0.0 \
  --set service.serverPort=80
```

Delete deployment
```sh
helm delete my-nginx-proxy -n my-nginx-proxy
```
