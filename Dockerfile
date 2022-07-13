FROM node:16.0.0-alpine

WORKDIR /srv/app

COPY . .

RUN node -v

RUN chmod +x /srv/app

EXPOSE 1337

ENTRYPOINT ["scripts/startup.sh"]
