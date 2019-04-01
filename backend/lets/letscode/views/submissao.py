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
            # TODO: verificações para ver se o JSON é válido
            if self.submissaoRequestValid(request):
                testsCases = TestCase.listAllByQuery(Query("questaoId", "==", request.data["questaoId"]))
                
                questao = Questao(request.data["questaoId"], testsCases)
                submissao = Submissao(request.data["algoritmo"], Estudante(request.data["estudanteId"], None), questao)

                # TODO: o que fazer se a verificação for falsa?
                if submissao.save():
                    
                    juiz = Juiz(submissao)
                    submissao.resultadosTestsCases = juiz.executarTestes(ArquivoSubmissao(submissao.codigo))

                    return JsonResponse(submissao.toJson(), safe=False, status=status.HTTP_201_CREATED)
            
        except Exception as exception:
            return JsonResponse({"erro":str(exception)}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        return Response(status=status.HTTP_201_CREATED)

    def submissaoRequestValid(self, request):
        if request.data["questaoId"] != None and request.data["questaoId"] != "" and request.data["algoritmo"] != None and request.data["algoritmo"] != "" and request.data["estudanteId"] != None and request.data["estudanteId"] != "":
            return True

        return False