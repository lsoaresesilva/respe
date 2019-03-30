from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin


from letscode.model.testCase import TestCase
from letscode.model.juiz import Juiz
from letscode.model.firestore.query import Query

import json
import os


class SubmissaoView(APIView):

    def post(self, request, format=None):
        

        # TODO: verificações para ver se o JSON é válido

        # TODO: carregar testes do banco de dados
        testes = TestCase.listAllByQuery(Query("questaoId", "==", "Ozwt1Hrmz7b8tlFwjDVW"))
        # TODO: o que fazer se testes for vazio?
        juiz = Juiz(request.data["algoritmo"], testes)
        print(juiz.executarTestes())

        # TODO: enviar um objeto submissão para o BD
        
        
        # Receber um json com o código, id do usuário e id da questão

        #return JsonResponse("olá", safe=False)
             
     

        
        
        return Response(status=status.HTTP_201_CREATED)