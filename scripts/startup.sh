#!/bin/sh

echo "Copy resource from /pre/app to /srv/app"

cp -r /pre/app /srv/app

echo "cd to /srv/app"

cd /srv/app

ls

echo "Installing"

yarn install

echo "Building"

yarn build

echo "Starting...!"

yarn start
