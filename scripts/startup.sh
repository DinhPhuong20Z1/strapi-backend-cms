#!/bin/sh
cp -r /pre/app /srv/app

cd /srv/app

yarn install

yarn build

yarn start
