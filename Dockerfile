FROM node:16.0.0-alpine

WORKDIR /srv/app

COPY . .

RUN node -v

RUN chmod -R 777 /srv/app

EXPOSE 1337

# ENTRYPOINT ["scripts/startup.sh"]

RUN yarn install

RUN yarn build

ENTRYPOINT ["yarn", "develop"]

