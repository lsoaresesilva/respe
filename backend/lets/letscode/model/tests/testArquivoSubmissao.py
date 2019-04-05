import unittest
import os
from letscode.model.arquivoSubmissao import ArquivoSubmissao


class TestArquivoSubmissao(unittest.TestCase):

    def test_criar_arquivo(self):
        a = ArquivoSubmissao("")
        
        self.assertIsNotNone(a.arquivo)
        a.apagarArquivo()

    def test_arquivo_invalido(self):
        a = ArquivoSubmissao("")
        a.apagarArquivo()
        self.assertFalse(a.is_arquivo_valido())

    def test_arquivo_valido(self):
        a = ArquivoSubmissao("")
        self.assertTrue(a.is_arquivo_valido())
        a.apagarArquivo()
    
    def test_apagar_arquivo(self):
        a = ArquivoSubmissao("")
        self.assertTrue(os.path.exists(a.arquivo.name))
        a.apagarArquivo()
        self.assertIsNone(a.arquivo)

    def test_apagar_arquivo_nao_existente(self):
        try:
            a = ArquivoSubmissao("")
            a.apagarArquivo()
            a.apagarArquivo()
        except Exception as e:
            self.fail("Unexpected exception %s" % e) 

    def test_escrever_codigo_arquivo(self):
        codigo = "x = 2\ny = 3"
        a = ArquivoSubmissao(codigo)
        arquivoCriado = open(a.arquivo.name, "r")
        self.assertEqual(codigo+"\n", arquivoCriado.read()) # a criação de arquivo no python acrescenta uma linha \n 
        a.apagarArquivo()
        

   
    