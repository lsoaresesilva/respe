import inspect
import re

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin

from google.cloud.firestore_v1beta1.document import DocumentReference

import os



def Collection(collectionName):
  def deco(cls):
    cls.collectionName = collectionName
    return cls
  return deco


class Document(object):

    collectionName = ""

    def __init__(self, id):
        self.id = id
        #TODO: disparar exceção se @collection() for vazio
        #self.documentToObject(document)
        

    def documentToObject(self, document):
        atributos = inspect.getmembers(self, lambda a:not(inspect.isroutine(a)))

        for k, v in document.items():
            # TODO: o método __init__ não é chamado, assim não sabemos quais são os atributos do obj. Tudo do document é adicionado à ele. Possibilidade: ter um atributo ignore no decorator para indicar o que não deve entrar
            setattr(self, k, v)
            
            
        
        #for atributo in atributos:
        #    for k, v in document.items():
        #        if atributo[0] == k:
	    #            setattr(self, k, v)

    def objectToDocument(self):
        atributos = inspect.getmembers(self, lambda a:not(inspect.isroutine(a)))
        document = {}
        
        for atributo in atributos:
            if "__" not in atributo[0]:
                if type(atributo[1]) in (int, str, bool, float) and atributo[0] != "collectionName":
                    document[atributo[0]] = atributo[1]
    
        return document

    @classmethod
    def startFireStore(self):
        try:
            dirname = os.path.dirname(__file__)
            cred = credentials.Certificate(os.path.join(dirname, '../../letscode-3fd06-d9fca7ca4859.json'))
            firebase_admin.initialize_app(cred)
            

        except ValueError:
            pass


    def save(self):
        Document.startFireStore()
        db = firestore.client()
        collection = db.collection(self.collectionName)
        
        
        resultado = collection.add(self.objectToDocument())
        if isinstance(resultado[1], DocumentReference):
            self.id = resultado[1].id
            return True
        else:
            # TODO: significa que o objeto não foi salvo, disparar erro
            return False
        

    @classmethod
    def listAllByQuery(cls, query):

        # TODO: verificar se o tipo de query é Query
        
        cls.startFireStore()
        
        db = firestore.client()
        collection = db.collection(cls.collectionName)
        documents = collection.where(query.column, query.operator, query.value).get()

        objects = []
        for document in documents:
            
            #doc = cls(document.id)
            doc = Document(document.id)
            
            doc.__class__ = cls
            

            doc.documentToObject(document.to_dict())

            objects.append(doc)

        return objects            