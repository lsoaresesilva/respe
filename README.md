# Letscode

Este repositório faz parte de um projeto de pesquisa do Instituto Federal de Pernambuco (IFPE) denominado: "Autorregulação da aprendizagem em estudantes de programação: uma proposta de intervenção".

# Objetivo
Construir um ambiente de desenvolvimento (IDE) online para o aprendizado de algoritmos. Inicialmente será oferecido suporte para a linguagem Python. Integrado ao ambiente está o suporte à autorregulação.

# Tecnologias
A criação da IDE será em Angular e o backend em Djanjgo (Python). A persistência de dados será feita no Firebase, especificamente com o Firestore.

Organizaremos o projeto em módulos do angular. Antes de fazer qualquer código certifique-se que você está no módulo adequado (a identificação do módulo ao qual pertence a issue está como tag da issue)

# Processo de desenvolvimento 
Em sprints e cada membro do projeto receberá uma Issue para desenvolver. O fluxo de trabalho (quadro kanban) está na seção Projects do repositório acima e deve ser utilizado.

# Arquitetura do projeto

https://www.lucidchart.com/documents/view/ae3fa50a-bbef-4e11-8f5a-515bc3533e6e

# Diagrama de classe
O diagrama de classes está neste link: https://www.lucidchart.com/invitations/accept/a6736d47-c33f-4f8a-bf67-03510629591b

# Fluxo de telas

https://www.lucidchart.com/invitations/accept/c08e9d10-8fa1-41e7-a148-c1b70f3cb0ed

# Instalação

1. Instalar o Angular. 
2. Instalar as dependências Python do projeto: pip3 install --user Django==2.2.4 && pip3 install --user djangorestframework && pip3 install --user django-cors-headers && pip3 install --user pexpect && pip3 install --user python-decouple
3. Clonar o projeto
4. Acessar a pasta do projeto e instalar as dependências do projeto: npm install
5. Acessar a pasta src/app/model/firestore e digitar o comando: git submodule init && git submodule update
6. Rodar o projeto: ng serve
7. Acessar a pasta backend e executar o servidor Django: python manage.py runserver
