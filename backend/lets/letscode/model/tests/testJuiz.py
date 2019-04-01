import unittest
import os
from letscode.model.juiz import Juiz
from letscode.model.testCase import TestCase
from letscode.model.errors.juizError import JuizError
from letscode.model.questao import Questao
from letscode.model.resultadoTestCase import ResultadoTestCase
from letscode.model.arquivoSubmissao import ArquivoSubmissao

from letscode.model.submissao import Submissao

class TestJuiz(unittest.TestCase):

    def stub_save():
        pass

    
    def test_saida_valida(self):
        submissao = Submissao("x = 2", None, None)
        j = Juiz(submissao)
        self.assertTrue(j.compararSaidaEsperadaComSaidaAlgoritmo("2".encode(), "2"))
        arquivo = ArquivoSubmissao(submissao.codigo)
        arquivo.apagarArquivo()

    #def test_saida_in_valida(self):
    #    j = Juiz("", [])
    #    self.assertTrue(j.testarSaida("2".encode(), None))
    #    j.arquivo.apagarArquivo()
        
    
    def test_executar_testes_questao_vazia(self):
        submissao = Submissao("x = 2", None, None)
        arquivo = ArquivoSubmissao(submissao.codigo)
        j = Juiz(submissao)
        with self.assertRaises(JuizError):
            j.executarTestes(arquivo)
        
        arquivo.apagarArquivo()

    #@unittest.skip
    def test_executar_codigo_com_erro(self):
        codigo = "x = input('bla')\nprint(y)"
        testsCases = [TestCase("1", ["2"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        arquivo = ArquivoSubmissao(submissao.codigo)
        j = Juiz(submissao)
        j.salvarResultados = stub_save
        self.assertListEqual([ResultadoTestCase(submissao, testsCases[0], False)], j.executarTestes(arquivo))
        arquivo.apagarArquivo()
        
    #@unittest.skip
    def test_executar_arquivo_inexistente(self):
        codigo = "x = input('bla')\nprint(y)"
        testsCases = [TestCase("1", ["2"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        arquivo = ArquivoSubmissao(submissao.codigo)
        j = Juiz(submissao)
        arquivo.apagarArquivo()
        with self.assertRaises(JuizError):
            j.executarTestes(arquivo)
    
    #@unittest.skip
    def test_executar_codigo_sucesso(self):
        codigo = "x = input('bla')\nprint(x)"
        testsCases = [TestCase("1", ["2"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        arquivo = ArquivoSubmissao(submissao.codigo)
        j = Juiz(submissao)
        j.salvarResultados = stub_save
        self.assertListEqual([ResultadoTestCase(submissao, testsCases[0], True)], j.executarTestes(arquivo))
        arquivo.apagarArquivo()

    #@unittest.skip
    def test_executar_codigo_com_menos_inputs(self):
        codigo = "x = input('blableble')\nprint(x)"
        testsCases = [TestCase("1", ["2", "3"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        arquivo = ArquivoSubmissao(submissao.codigo)
        j = Juiz(submissao)
        j.salvarResultados = stub_save
        self.assertListEqual([ResultadoTestCase(submissao, testsCases[0], False)], j.executarTestes(arquivo))
        arquivo.apagarArquivo()

    #@unittest.skip
    def test_sucesso_match_input_codigo(self):
        codigo = "x = input('blableble')\nprint(x)"
        
        testsCases = [TestCase("1", ["2"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        j = Juiz(submissao)
        self.assertTrue(j.matchInputCodigo(testsCases[0].entradas))

        codigo = "x = input('blableble')\ninput('blu')"
        testsCases = [TestCase("1", ["2", "3"], "2")]
        submissao = Submissao(codigo, None, questao)
        j = Juiz(submissao)
        self.assertTrue(j.matchInputCodigo(testsCases[0].entradas))
        

    #@unittest.skip
    def test_falha_match_input_codigo(self):
        codigo = "x = input('blableble')\nprint(x)"
        
        testsCases = [TestCase("1", ["2", "3"], "2")]
        questao = Questao("", testsCases)
        submissao = Submissao(codigo, None, questao)
        j = Juiz(submissao)
        self.assertFalse(j.matchInputCodigo(testsCases[0].entradas))
        
        
    

   
    