import unittest
import os
from letscode.model.juiz import Juiz
from letscode.model.testCase import TestCase
from letscode.model.errors.testCaseError import TestCaseError

class TestTestCase(unittest.TestCase):


    def test_deve_falhar_tests_cases_invalidos(self):
        
        self.assertFalse(TestCase.is_tests_cases_valido(None))
        self.assertFalse(TestCase.is_tests_cases_valido([]))

    def test_deve_ter_sucesso_tests_cases_validos(self):
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        t2 = TestCase("2", {"entradas":["2"], "saida":"2"})

        self.assertTrue(TestCase.is_tests_cases_valido([t1,t2]))

    def test_falha_test_case_valido(self):
        t1 = TestCase("1", {"saida":"2"})
        self.assertFalse(t1.is_test_case_valido())
        t1 = TestCase("1", {"entradas":["2"]})
        self.assertFalse(t1.is_test_case_valido())

    def test_sucesso_test_case_valido(self):
        t1 = TestCase("1", {"entradas":["2"], "saida":"2"})
        self.assertTrue(t1.is_test_case_valido())
        

        
        
    

   
    