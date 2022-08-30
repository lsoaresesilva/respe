#!/bin/bash
export NODE_OPTIONS=--max_old_space_size=4096
rm -rf dist/32bits
echo "Gerando build"
ng build --configuration production
echo "Enviando para o mundo!"
scp -r dist/32bits lsoaresesilva@izzypeazy.com:~/www
echo "Wooooho!"
