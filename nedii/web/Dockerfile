FROM node:16-alpine

ARG REACT_APP_API_URL
ARG REACT_APP_BRANCH_NAME
ARG REACT_APP_FACEBOOK_APP_ID
ARG REACT_APP_PRODUCTION

WORKDIR /app
COPY . .
RUN mkdir /app/views
RUN cp /app/build/index.html /app/views/index.hbs

RUN npm i --production
RUN ls

CMD [ "/bin/sh", "docker-entrypoint.sh" ]
