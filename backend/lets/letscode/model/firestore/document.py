import inspect

from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin

import os

"""
def collection(collectionName):
    def alterarCollectionName(klass):
        def new(cls, *args, **kwargs):
            result = super(cls, cls).__new__(cls)
            setattr(result, "collectionName", collectionName)
                
            return result
        klass.__new__ = staticmethod(new)
        return klass 


def class_decorator(*method_names):
    def class_rebuilder(cls):
        
        class NewClass(cls):
            "This is the overwritten class"
            def __getattribute__(self, attr_name):
                obj = super(NewClass, self).__getattribute__(attr_name)
                if hasattr(obj, '__call__') and attr_name in method_names:
                    return method_decorator(obj)
                return obj

        return NewClass
    return class_rebuilder
"""
"""
class collection(object):

    
    def __init__(self, *args):
        print(self)
        print(*args)
        self.collectionName = args
        
        #setattr(cls, "collectionName", collectionName)
        #self.wrapped = cls(*args)
    def __call__(self, args): 
        print("chamada")
        #setattr(*args, "collectionName", self.collectionName)
        args.collectionName = self.collectionName
        # We can add some code  
        # before function call 
  
        #self.function(*args, **kwargs) 
  
        # We can also add some code 
        # after function call. 
"""

def Collection(collectionName):
  def deco(cls):
    cls.collectionName = collectionName
    return cls
  return deco


class Document():

    collectionName = ""

    def __init__(self, id, document):
        self.id = id
        
        self.createFromDocument(document)
        

    def createFromDocument(self, document):
        atributos = inspect.getmembers(self, lambda a:not(inspect.isroutine(a)))
        for atributo in atributos:
            for k, v in document.items():
                if atributo[0] == k:
	                setattr(self, k, v)

    @classmethod
    def listAllByQuery(cls, query):

        # TODO: verificar se o tipo de query é Query
        
        try:
            dirname = os.path.dirname(__file__)
            cred = credentials.Certificate(os.path.join(dirname, '../../letscode-3fd06-d9fca7ca4859.json'))
            firebase_admin.initialize_app(cred)
            

        except ValueError:
            pass

        db = firestore.client()
        collection = db.collection(cls.collectionName)
        documents = collection.where(query.column, query.operator, query.value).get()

        objects = []
        for document in documents:
            
            doc = cls(document.id, document.to_dict())
            objects.append(doc)

        return objects            