#!/bin/sh

set -e

env=${ENVIRONMENT:-dev}
echo "Build in $ENVIRONMENT env"
if [ "$env" = "prod" ]; then
  NODE_ENV=production yarn build
else
  yarn build
fi
