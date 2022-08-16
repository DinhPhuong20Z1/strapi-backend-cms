#!/bin/sh

set -e

env=${ENVIRONMENT:-dev}
if [ "$env" = "prod" ]; then
  NODE_ENV=production strapi start
else
  strapi develop
fi
