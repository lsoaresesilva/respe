import inspect
import re

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin

import os


def Collection(collectionName):
  def deco(cls):
    cls.collectionName = collectionName
    return cls
  return deco


class Document(object):

    collectionName = ""

    def __init__(self, id, document):
        self.id = id
        
        self.documentToObject(document)
        

    def documentToObject(self, document):
        atributos = inspect.getmembers(self, lambda a:not(inspect.isroutine(a)))
        for atributo in atributos:
            for k, v in document.items():
                if atributo[0] == k:
	                setattr(self, k, v)

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
        collection = db.collection(Document.collectionName)
        collection.add(data)

    @classmethod
    def listAllByQuery(cls, query):

        # TODO: verificar se o tipo de query é Query
        
        cls.startFireStore()
        
        db = firestore.client()
        collection = db.collection(cls.collectionName)
        documents = collection.where(query.column, query.operator, query.value).get()

        objects = []
        for document in documents:
            
            doc = cls(document.id, document.to_dict())
            objects.append(doc)

        return objects            