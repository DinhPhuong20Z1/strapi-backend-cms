#!/bin/sh

rm -rf /srv/app/build /srv/app/config

cp -r /pre/app/* /srv/app

cd /srv/app

yarn install

yarn build

yarn start
