import inspect

class Document():

    def __init__(self, id, document):
        self.id = id
        self.createFromDocument(document)

    def createFromDocument(self, document):
        atributos = inspect.getmembers(self, lambda a:not(inspect.isroutine(a)))
        for atributo in atributos:
            for k, v in document.items():
                if atributo[0] == k:
	                setattr(self, k, v)
           
                