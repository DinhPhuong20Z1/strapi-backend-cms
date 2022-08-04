FROM node:16.0.0-alpine

WORKDIR /pre/app/

COPY . .

RUN chmod -R 777 /pre/app/

EXPOSE 1337

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN yarn install

RUN yarn build

RUN rm -rf node-modules

ENTRYPOINT ["scripts/startup.sh"]

