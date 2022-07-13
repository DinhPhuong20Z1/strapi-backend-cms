FROM node:16.0.0-alpine

WORKDIR /srv/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN node -v

EXPOSE 1337

CMD ["yarn", "start"]
