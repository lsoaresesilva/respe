from letscode.model.document import Document

class TestCase(Document):

    def __init__(self, id, document):
        self.entradas = {}
        self.saida = ""
        super().__init__(id, document)