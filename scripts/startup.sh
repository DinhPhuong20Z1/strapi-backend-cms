#!/bin/sh

set -e

rm -rf /srv/app/build /srv/app/config

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

echo "Install dependencies ..."

yarn install

env=${ENVIRONMENT:-dev}
if [ "$env" = "prod" ]; then
  NODE_ENV=production yarn develop
else
  yarn develop
fi
