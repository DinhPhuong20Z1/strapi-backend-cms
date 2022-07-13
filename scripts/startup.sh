#!/bin/sh
cp -r /pre/app /srv/app

chmod +x /srv/app/scripts/startup.sh

cd /srv/app

yarn install

yarn build

yarn start
