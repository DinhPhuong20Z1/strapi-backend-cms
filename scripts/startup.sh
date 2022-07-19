#!/bin/sh

rm -rf /srv/app/build /srv/app/config

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

echo "Install dependencies ..."

npm ls --depth 0

# yarn install

# cp -f /pre/app/edit/index.js /srv/app//node_modules/@strapi/provider-email-amazon-ses/lib

yarn develop
