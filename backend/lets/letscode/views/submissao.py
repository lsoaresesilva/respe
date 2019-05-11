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


class SubmissaoView(APIView):

    def post(self, request, format=None):
        

        try:
            
            if self.submissaoRequestValid(request):
                # TODO: receber via JSON do frontend
                testsCases = TestCase.listAllByQuery(Query("questaoId", "==", request.data["questaoId"]))
                
                questao = Questao(request.data["questaoId"], testsCases)
                submissao = Submissao(request.data["id"], request.data["codigo"], Estudante(request.data["estudanteId"], None), questao)

                juiz = Juiz(submissao)
                arquivo = ArquivoSubmissao(submissao.codigo)
                submissao.resultadosTestsCases = juiz.executarTestes(arquivo)
                arquivo.apagarArquivo()
                return JsonResponse(submissao.toJson(), safe=False, status=status.HTTP_201_CREATED)
            
        except Exception as exception:
            return JsonResponse({"erro":str(exception)}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        return Response(status=status.HTTP_201_CREATED)

    # TODO: deslocar isto para um model.
    def submissaoRequestValid(self, request):
        if request.data["id"] != None and request.data["questaoId"] != None and request.data["questaoId"] != "" and request.data["codigo"] != None and request.data["codigo"] != "" and request.data["estudanteId"] != None and request.data["estudanteId"] != "":
            return True

        return False