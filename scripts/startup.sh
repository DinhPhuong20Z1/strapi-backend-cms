#!/bin/sh

set -e

rm -rf /srv/app/build /srv/app/config

cp -rf /pre/app/* /srv/app

diff /pre/app/package.json /srv/app/package.json

cd /srv/app

echo "Install dependencies ..."

npm ls --depth 0

yarn install

env=${ENVIRONMENT:-dev}
if [ "$env" = "prod" ]; then
  yarn start
else
  yarn develop
fi
