from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection
from letscode.model.firestore.query import Query

@Collection("questoes")
class Questao(Document):

    def __init__(self, id):
        self.id = id
