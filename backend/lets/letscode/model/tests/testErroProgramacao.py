import unittest
import os

from letscode.model.erroProgramacao import ErroProgramacao

class TestErroProgramacao(unittest.TestCase):

    
    def test_deve_extrair_dados_erro(self):
        msgErro = "NameError: name 'wait_time_int' is not defined on line 5"
        erro = ErroProgramacao(msgErro)
        self.assertEqual(erro.tipo, "NameError")
        self.assertEqual(erro.linha, "5")

        msgErro = "bla2\nTraceback (most recent call last):\nFile 'RX7XAP.py', line 2, in <module>print(y)NameError: name 'y' is not defined"
        erro = ErroProgramacao(msgErro)
        self.assertEqual(erro.tipo, "NameError")
        self.assertEqual(erro.linha, "2")

    def test_deve_disparar_uma_exceção_para_mensagens_de_erro_invalidas(self):
        msgErro = "NameError name 'wait_time_int' is not defined line 5"

        with self.assertRaises(Exception):
            erro = ErroProgramacao(msgErro)
        
        
    

   
    