FROM node:16.0.0-alpine

WORKDIR /pre/app/

COPY . .

RUN chmod -R 777 /pre/app/

EXPOSE 1337

ENTRYPOINT ["scripts/startup.sh"]

