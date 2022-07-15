#!/bin/bash

rm -rf /srv/app/build /srv/app/config /srv/app/node_modules

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

yarn develop
