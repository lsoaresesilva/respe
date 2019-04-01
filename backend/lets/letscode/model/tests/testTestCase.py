import unittest
import os
from letscode.model.juiz import Juiz
from letscode.model.testCase import TestCase
from letscode.model.errors.testCaseError import TestCaseError

class TestTestCase(unittest.TestCase):


    def test_deve_falhar_tests_cases_invalidos(self):
        with self.assertRaises(ValueError):
            TestCase("1", None, "2")
            TestCase("1", "2", None)
            TestCase("1", "2", "2")
            TestCase("1", 2, "2")
        
    
    def test_deve_ter_sucesso_tests_cases_validos(self):
        t1 = TestCase("1", ["2"], "2")
        

        
        
    

   
    