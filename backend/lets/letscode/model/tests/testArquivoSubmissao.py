import unittest
import os
from letscode.model.arquivoSubmissao import ArquivoSubmissao

class TestStringMethods(unittest.TestCase):

    def test_criar_arquivo(self):
        a = ArquivoSubmissao("")
        
        self.assertIsNotNone(a.arquivo)
        a.apagarArquivo()

    
    def test_apagar_arquivo(self):
        a = ArquivoSubmissao("")
        self.assertTrue(os.path.exists(a.arquivo.name))
        a.apagarArquivo()
        self.assertFalse(os.path.exists(a.arquivo.name))
    