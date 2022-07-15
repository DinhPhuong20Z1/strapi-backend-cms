#!/bin/sh

rm -rf /srv/app/build /srv/app/config /srv/app/package.json /srv/app/package-lock.json /srv/app/yarn.lock

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

yarn install

yarn build

yarn develop
