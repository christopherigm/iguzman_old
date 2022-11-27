## Deploy Nginx proxy

Create namespace
```sh
kubectl create namespace prometheus
```

Add prometheus helm repository
```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

List prometheus repositories
```sh
helm search repo prometheus-community
```

Deploy prometheus stack
```sh
helm install prometheus-stack \
  -n prometheus \
  prometheus-community/kube-prometheus-stack
```

Deploy ingress controller
```sh
helm install prometheus-ingress . \
  --namespace=prometheus \
  --set ingress.host=monitor.iguzman.com.mx
```

Delete deployment
```sh
helm delete prometheus-ingress -n prometheus
```
