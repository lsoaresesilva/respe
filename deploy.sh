#!/bin/bash

rm -rf dist/letscode
rm -rf /usr/share/nginx/html/letscode
git pull origin master
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod
cp -rf dist/letscode ~/usr/share/nginx/html
