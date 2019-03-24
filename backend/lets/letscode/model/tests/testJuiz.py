import unittest
from letscode.model.juiz import Juiz

class TestStringMethods(unittest.TestCase):

    def test_criar_arquivo(self):
        j = Juiz("", [])
        arquivo = j.criarArquivo()
        self.assertIsNotNone(arquivo)
