import unittest
import os
from letscode.model.juiz import Juiz
from letscode.model.testCase import TestCase
from letscode.model.errors.juizError import JuizError

class TestJuiz(unittest.TestCase):

    
    def test_saida_valida(self):
        j = Juiz("", [])
        self.assertTrue(j.testarSaida("2".encode(), "2"))
        j.arquivo.apagarArquivo()

    #def test_saida_in_valida(self):
    #    j = Juiz("", [])
    #    self.assertTrue(j.testarSaida("2".encode(), None))
    #    j.arquivo.apagarArquivo()
        

    def test_executar_testes_test_case_vazio(self):
        
        j = Juiz("", [])
        with self.assertRaises(JuizError):
            j.executarTestes()
        
        j.arquivo.apagarArquivo()
        
    
    def test_executar_codigo_vazio(self):
        j = Juiz("", [])
        
        with self.assertRaises(JuizError):
            j.executarTestes()
        
        j.arquivo.apagarArquivo()

    
    def test_executar_codigo_com_erro(self):
        codigo = "x = input('bla')\nprint(y)"
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        j = Juiz("", [t1])
        self.assertListEqual([{"id":"1", "status":False}], j.executarTestes())
        j.arquivo.apagarArquivo()

    
    def test_executar_test_case_none(self):
        j = Juiz("", None)
        with self.assertRaises(JuizError):
            j.executarTestes()
        
        j.arquivo.apagarArquivo()
        
    def test_executar_arquivo_inexistente(self):
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        j = Juiz("", [t1])
        j.arquivo.apagarArquivo()
        with self.assertRaises(JuizError):
            j.executarTestes()

    
    def test_executar_codigo_sucesso(self):
        codigo = "x = input('bla')\nprint(x)"
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        j = Juiz(codigo, [t1])
        self.assertListEqual([{"id":"1", "status":True}], j.executarTestes())
        j.arquivo.apagarArquivo()

    
    def test_executar_codigo_com_menos_inputs(self):
        codigo = "x = input('blableble')\nprint(x)"
        t1 = TestCase("1", {"entradas":["2", "3"], "saida":"2"})
        j = Juiz(codigo, [t1])
        self.assertListEqual([{"id":"1", "status":False}], j.executarTestes())
        j.arquivo.apagarArquivo()

     
    def test_sucesso_match_input_codigo(self):
        codigo = "x = input('blableble')\nprint(x)"
        
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        j = Juiz(codigo, [t1])
        self.assertTrue(j.matchInputCodigo(t1.entradas))
        j.arquivo.apagarArquivo()

        codigo = "x = input('blableble')\ninput('blu')"
        t1 = TestCase("1", {"entradas":["2", "3"], "saida":"2"})
        j = Juiz(codigo, [t1])
        self.assertTrue(j.matchInputCodigo(t1.entradas))
        j.arquivo.apagarArquivo()

    
    def test_falha_match_input_codigo(self):
        codigo = "x = input('blableble')\nprint(x)"
        
        t1 = TestCase("1", {"entradas":["2", "3"], "saida":"2"})
        j = Juiz(codigo, [t1])
        self.assertFalse(j.matchInputCodigo(t1.entradas))
        j.arquivo.apagarArquivo()
        
    

   
    