#!/bin/bash

rm -rf dist/32bits
echo "Gerando build"
ng build --prod
echo "Enviando para o remoto"
scp -r dist/32bits lsoaresesilva@35.208.64.26:~/www
echo "Enviado"
