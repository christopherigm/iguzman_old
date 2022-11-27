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
web-vitals wnumb qrcode.react rrmc replace jose \
@fortawesome/fontawesome-svg-core \
@fortawesome/free-brands-svg-icons \
@fortawesome/free-regular-svg-icons \
@fortawesome/free-solid-svg-icons \
@fortawesome/react-fontawesome \
@mui/material @emotion/react @emotion/styled
```

Dependencies
```sh
npm i axios dotenv express express-handlebars
```

### Production deployment

1) Build and publish Docker image
```sh
docker build -t my-cv:latest . \
  --build-arg REACT_APP_API_URL="https://api.resume.iguzman.com.mx/v1/" \
  --build-arg REACT_APP_BRANCH_NAME=main \
  --build-arg REACT_APP_PRODUCTION=true && \
docker tag my-cv:latest christopherguzman/my-cv:latest && \
docker push christopherguzman/my-cv:latest
```

2) Deploy Nginx server
```sh
helm install nginx-my-cv deployment/nginx \
  --namespace=my-cv \
  --set webAppName=my-cv \
  --set volumeMountPath=shared-volume
```

3) Deploy microservice
```sh
helm install my-cv deployment \
  --namespace=my-cv \
  --set ingress.enabled=true \
  --set ingress.host=resume.iguzman.com.mx
```

4) Delete deployments
```sh
helm delete nginx-my-cv -n my-cv && \
helm delete my-cv -n my-cv
```


### Production Android App build

Set env variables
```sh
export KEYSTORE_PASSWORD=<PASSWORD>
```

Generate app.keystore
```sh
$JAVA_HOME/bin/keytool -genkey -v \
  -keystore app.keystore \
  -alias app \
  -keyalg RSA \
  -keysize 4096 \
  -storepass $KEYSTORE_PASSWORD \
  -validity 10000
```

Build
```sh
cordova build android --release -- \
  --keystore=app.keystore \
  --storePassword=$KEYSTORE_PASSWORD \
  --password=$KEYSTORE_PASSWORD \
  --alias=app \
  --packageType=bundle
```

Sign build
```sh
$JAVA_HOME/bin/jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA \
  -keystore app.keystore \
  -storepass $KEYSTORE_PASSWORD \
  platforms/android/app/build/outputs/bundle/release/app-release.aab \
  app
```

Copy build
```sh
cp android/platforms/android/app/build/outputs/bundle/release/app-release.aab .
```
