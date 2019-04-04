from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection

@Collection("resultadoTestCase")
class ResultadoTestCase(Document):

    def __init__(self, submissao, testCase, status):
        self.submissao = submissao
        self.testCase = testCase
        self.status = status

    def objectToDocument(self):
        document = super().objectToDocument()
        document["idTestCase"] = self.testCase.id
        document["idSubmissao"] = self.submissao.id
        return document

    def __eq__(self, other):
        return self.testCase.id == other.testCase.id

    def toJson(self):
        return {
            "id":self.id,
            "TestCase":self.testCase.id,
            "status":self.status
        }