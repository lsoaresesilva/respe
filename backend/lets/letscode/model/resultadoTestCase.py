from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection

@Collection("resultadoTestCase")
class ResultadoTestCase(Document):

    def __init__(self, testCase, status):
        self.status = status
        self.testCase = testCase

    def objectToDocument(self):
        document = super().objectToDocument()
        document["idTestCase"] = self.testCase.id
        return document