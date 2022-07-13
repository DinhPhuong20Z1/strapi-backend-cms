#!/bin/sh
cp -r /pre/app /srv/app
chmod -R 777 /srv/app
cd /srv/app
yarn install
yarn build
yarn start
