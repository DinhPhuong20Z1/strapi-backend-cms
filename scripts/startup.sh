#!/bin/sh

echo "Content of /pre/app"
ls /pre/app

echo "Content of /srv/app"
ls /srv/app

echo "Copy resource from /pre/app to /srv/app"

cp -r /pre/app /srv/app

echo "cd to /srv/app"

cd /srv/app

ls /srv/app

echo "Installing"

yarn install

echo "Building"

yarn build

echo "Starting...!"

yarn start
