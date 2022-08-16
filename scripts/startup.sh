#!/bin/sh

set -e

env=${ENVIRONMENT:-dev}
if [ "$env" = "prod" ]; then
  NODE_ENV=production yarn develop
else
  yarn develop
fi
