FROM node:16.0.0-alpine

RUN echo "Create folder /srv/app"

RUN mkdir /srv/app

WORKDIR /pre/app

COPY . .

RUN node -v

RUN chmod -R 777 /pre/app

EXPOSE 1337

ENTRYPOINT ["scripts/startup.sh"]
