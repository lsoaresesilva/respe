from letscode.model.document import Document

from letscode.model.errors.testCaseError import TestCaseError

class TestCase(Document):

    def __init__(self, id, document):
        self.entradas = []
        self.saida = ""
        super().__init__(id, document)

    def is_test_case_valido(self):
        if not self.entradas or self.saida == "":
            return False

        return True

    @staticmethod
    def is_tests_cases_valido(testCases):
        if testCases == None or not testCases:
            return False

        try:
            iter(testCases)
            return True
        except TypeError as te:
            return False
        