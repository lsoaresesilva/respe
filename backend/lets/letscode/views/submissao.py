from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin


from letscode.model.testCase import TestCase
from letscode.model.juiz import Juiz

import json
import os


class SubmissaoView(APIView):

    def post(self, request, format=None):
        

        # TODO: verificações para ver se o JSON é válido

        # TODO: carregar testes do banco de dados

        
        
        try:
            dirname = os.path.dirname(__file__)
            cred = credentials.Certificate(os.path.join(dirname, '../letscode-3fd06-d9fca7ca4859.json'))
            firebase_admin.initialize_app(cred)
        except ValueError:
            pass

        db = firestore.client()
        testsCases = db.collection(u'testsCases')

        
        

        # TODO: pegar o questão id do JSON
        
        query_ref = testsCases.where(u'questaoId', u'==', u' Ozwt1Hrmz7b8tlFwjDVW')
        results = query_ref.get()
        testes = []
        for testCase in results:
            t = TestCase(testCase.id, testCase.to_dict())
            testes.append(t)
            
            #print(u'{} => {}'.format(post.id, post.to_dict()))
        
        juiz = Juiz(request.data["algoritmo"], testes)
        juiz.analisar()

        # TODO: enviar um objeto submissão para o BD
        

        """"
        for doc in docs:
            print(u'{} => {}'.format(doc.id, doc.to_dict()))
        collections = db.collections()
        for collection in collections:
            print(collection.id)    

        

        docs = db.collection(u'envioCodigo').get()
        #print(u'Document data: {}'.format(docs.to_dict()))
    
        #print(docs)
        for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))

        # Receber um json com o código, id do usuário e id da questão

        return JsonResponse("olá", safe=False)
        """    
        
        return Response(status=status.HTTP_201_CREATED)