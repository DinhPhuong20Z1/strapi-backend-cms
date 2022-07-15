#!/bin/sh

rm -rf /srv/app/build /srv/app/config

cp -r /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

yarn develop
