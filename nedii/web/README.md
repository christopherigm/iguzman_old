# To Do

## Requirements

* Node.js
* NPM

### 1. Install dependences
```sh
$ npm i
```
### 2. Run
```sh
$ npm run start
```
### 3. Build
```sh
$ npm run build
```

## NPM dependencies

Dev dependencies
```sh
npm i --save-dev react-scripts \
@testing-library/react @testing-library/jest-dom \
@testing-library/user-event @types/express @types/jest \
@types/materialize-css @types/node @types/qrcode.react \
@types/react @types/react-dom @types/react-router-dom \
@types/redux-logger @types/wnumb \
chart.js cross-env eslint eslint-plugin-react \
materialize-css npm-run-all react react-dom \
react-redux react-router-dom react-scripts \
redux-devtools-extension redux-logger redux-persist \
sass stylelint stylelint-scss swiper typescript \
web-vitals wnumb qrcode.react rrmc
```

Dependencies
```sh
npm i axios dotenv express express-handlebars
```

### Production deployment

1) Build and publish Docker image
```sh
docker build -t nedii:latest . \
  --build-arg REACT_APP_API_URL="https://api.nedii.iguzman.com.mx/v1/" \
  --build-arg REACT_APP_BRANCH_NAME=main \
  --build-arg REACT_APP_FACEBOOK_APP_ID=ddf844gh48gh4g \
  --build-arg REACT_APP_PRODUCTION=true && \
docker tag nedii:latest christopherguzman/nedii:latest && \
docker push christopherguzman/nedii:latest
```

2) Deploy Nginx server
```sh
helm install nginx-web-app deployment/nginx \
  --namespace=nedii \
  --set webAppName=nedii \
  --set volumeMountPath=shared-volume
```

3) Deploy microservice
```sh
helm install nedii deployment \
  --namespace=nedii \
  --set ingress.host=nedii.iguzman.com.mx
```

4) Delete deployments
```sh
helm delete nginx-web-app -n nedii && \
helm delete nedii -n nedii
```
