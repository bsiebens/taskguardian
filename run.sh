#!/bin/sh

export NODE_ENV=production

mkdir -p /run/nginx
cd /src/taskguardian
node build &
nginx -g 'daemon off;'