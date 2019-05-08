from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin


from letscode.model.testCase import TestCase
from letscode.model.juiz import Juiz
from letscode.model.submissao import Submissao
from letscode.model.estudante import Estudante
from letscode.model.questao import Questao

from letscode.model.arquivoSubmissao import ArquivoSubmissao
from letscode.model.errors.juizError import JuizError

from letscode.model.firestore.query import Query

import json
import os


class VisualizacaoAlgoritmoView(APIView):

    def post(self, request, format=None):

        try:
            # TODO: verificações para ver se o JSON é válido
            if self.submissaoRequestValid(request):
                testsCases = TestCase.listAllByQuery(Query("questaoId", "==", request.data["questaoId"]))
                
                questao = Questao(request.data["questaoId"], testsCases)
                submissao = Submissao(None, request.data["codigo"], Estudante(request.data["estudanteId"], None), questao)

                juiz = Juiz(submissao)
                arquivo = ArquivoSubmissao(submissao.codigo)
                jsonVisualizacao = juiz.executarVisualizacao(arquivo)
                arquivo.apagarArquivo()
                return JsonResponse(jsonVisualizacao, safe=False, status=status.HTTP_201_CREATED)
            
        except Exception as exception:
            return JsonResponse({"erro":str(exception)}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        return Response(status=status.HTTP_201_CREATED)

    # TODO: deslocar isto para um model.
    def submissaoRequestValid(self, request):
        if request.data["questaoId"] != None and request.data["questaoId"] != "" and request.data["codigo"] != None and request.data["codigo"] != "" and request.data["estudanteId"] != None and request.data["estudanteId"] != "":
            return True

        return False
