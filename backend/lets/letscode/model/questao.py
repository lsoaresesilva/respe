from letscode.model.firestore.document import Document

from letscode.model.firestore.query import Query

class Questao(Document):

    def __init__(self, id, testsCases):
        self.id = id
        if testsCases == None or len(testsCases) == 0:
            raise ValueError("Não é possível criar uma questão, pois ela não possui tests cases")
        
        self.testsCases = testsCases
