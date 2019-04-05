import pexpect
import re
import os

from letscode.model.arquivoSubmissao import ArquivoSubmissao
from letscode.model.errors.juizError import JuizError
from letscode.model.testCase import TestCase

class Juiz():

    def __init__(self, codigo, testsCases):
        self.codigo = codigo
        self.testsCases = testsCases
        self.arquivo = ArquivoSubmissao(codigo)
            
    def executarTestes(self):
        resultados = []

        if TestCase.is_tests_cases_valido(self.testsCases):
            for teste in self.testsCases:
            # TODO: verificar se o arquivo existe
                if self.arquivo.is_arquivo_valido():
                    if self.matchInputCodigo(teste.entradas):
                    
                        child = pexpect.spawn('python3 '+self.arquivo.nome())
                
                        try:
                            for entradas in teste.entradas:
                                
                                child.expect(".*")
                                child.sendline(entradas)
                                
                            child.expect(pexpect.EOF)
                            resultadoTeste = self.testarSaida(child.before, teste.saida)
                            child.close()
                        except OSError:
                                resultadoTeste = False
                        
                    else:
                        resultadoTeste = False
                    resultados.append({"id":teste.id, "status":resultadoTeste})    
                else:
                    raise JuizError("O arquivo de código não foi encontrado.")
        else:
            raise JuizError("O conjunto de test case não é válido.")

        return resultados

    def testarSaida(self, resultadoAlgoritmo, resultadoEsperado):
        algoritmoCorreto = False
        
        saidas = re.split("\\r\\n(.*)\\r\\n", resultadoAlgoritmo.decode("utf-8"))
        for texto in saidas:
            if texto == resultadoEsperado:
                algoritmoCorreto = True
                break

        return algoritmoCorreto
    
    # Verifica se o código dispõe do quantitativo de inputs necessários para a quantidade de entradas
    def matchInputCodigo(self, entradas):
        totalInputs = re.findall("input", self.codigo)
        if len(entradas) == len(totalInputs):
            return True
        return False


    