from letscode.model.testCase import TestCase
from letscode.model.resultadoTestCase import ResultadoTestCase
from letscode.model.firestore.query import Query
from google.cloud.exceptions import NotFound

import unittest

class TestResultadoTestCase(unittest.TestCase):

    def test_deve_carregar_um_objeto(self):
        #resultado = ResultadoTestCase.get(Query("id", "==", "1uufajSBoFPcQbiAK3LG"))
        resultado = ResultadoTestCase.get("1uufajSBoFPcQbiAK3LG")
        self.assertIsNotNone(resultado)
        
    def test_deve_disparar_excecao_com_document_inexistente(self):
        with self.assertRaises(NotFound):
            resultado = ResultadoTestCase.get("12345")
