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

from letscode.model.arquivoSubmissao import ArquivoSubmissao
from letscode.model.errors.juizError import JuizError

from letscode.model.firestore.query import Query

import json
import os


class SubmissaoView(APIView):

    def post(self, request, format=None):
        
        json = "" 
        httpStatus = 201
        try:
            
            if self.submissaoRequestValid(request):
                # TODO: receber via JSON do frontend
                #testsCases = TestCase.listAllByQuery(Query("questaoId", "==", request.data["questaoId"]))
                
                
                submissao = Submissao(None, request.data["submissao"]["codigo"], Estudante(request.data["submissao"]["estudanteId"], None), request.data["questao"])

                juiz = Juiz(submissao)
                arquivo = ArquivoSubmissao(submissao.codigo)
                
                if request.data["tipo"] == "execução":
                    submissao.resultadosTestsCases = juiz.executarTestes(arquivo)
                    json = submissao.toJson()
                else:
                    json = juiz.executarVisualizacao(arquivo)
            else:    
                httpStatus = 400
        except Exception as exception:
            json = {"erro":str(exception)}
            httpStatus = 500
        finally:
            arquivo.apagarArquivo()
            return JsonResponse(json, safe=False, status=httpStatus)

    # TODO: deslocar isto para um model.
    def submissaoRequestValid(self, request):
        if request.data["tipo"] != None and request.data["assunto"] != None and request.data["assunto"] != "" and request.data["submissao"] != None and request.data["submissao"] != "" and request.data["questao"] != None and request.data["questao"] != "":
            return True

        return False