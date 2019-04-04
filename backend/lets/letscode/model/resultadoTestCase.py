from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection

@Collection("resultadoTestCase")
class ResultadoTestCase(Document):

    def __init__(self, submissao, testCase, respostaAlgoritmo, status):
        self.submissao = submissao
        self.testCase = testCase
        self.status = status
        self.respostaAlgoritmo = respostaAlgoritmo

    def objectToDocument(self):
        document = super().objectToDocument()
        document["idTestCase"] = self.testCase.id
        document["idSubmissao"] = self.submissao.id
        document["respostaAlgoritmo"] = self.respostaAlgoritmo
        return document

    def __eq__(self, other):
        return self.testCase.id == other.testCase.id and self.respostaAlgoritmo == other.respostaAlgoritmo

    def toJson(self):
        return {
            "id":self.id,
            "idTestCase":self.testCase.id,
            "respostaAlgoritmo":self.respostaAlgoritmo,
            "status":self.status
        }