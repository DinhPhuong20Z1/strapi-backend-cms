#!/bin/bash

rm -rf /srv/app/build /srv/app/config

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

yarn install

yarn develop
