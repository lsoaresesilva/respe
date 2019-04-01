from letscode.model.firestore.document import Document

from letscode.model.errors.testCaseError import TestCaseError
from letscode.model.firestore.document import Collection

@Collection("testsCases")
class TestCase(Document):

    def __init__(self, id, entradas, saida):
        if not entradas or (type(entradas) != list and len(entradas) == 0): 
            raise ValueError("Entradas inválidas para TestCase")
        
        if saida == "" or not saida:
            raise ValueError("Saída inválida para TestCase")

        super().__init__(id)

        self.entradas = entradas
        self.saida = saida
        

    def isValido(self):
        if not self.entradas or len(self.entradas) == 0 or self.saida == "" or not self.saida:
            return False

        return True

    @staticmethod
    def isTestsValidos(testCases):
        if testCases == None or not testCases:
            return False

        try:
            iter(testCases)
            return True
        except TypeError as te:
            return False
        