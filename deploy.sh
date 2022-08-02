#!/bin/bash

rm -rf dist/32bits
echo "Gerando build"
ng build --prod --aot
echo "Enviando para o mundo!"
scp -r dist/32bits lsoaresesilva@izzypeazy.com:~/www
echo "Wooooho!"
