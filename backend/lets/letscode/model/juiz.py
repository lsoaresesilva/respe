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
                    child = pexpect.spawn('python3 '+self.arquivo.nome())
                    print("arquivo")
                    print(self.arquivo.arquivo.read())
                    print(self.arquivo.nome())
                    for entradas in teste.entradas:
                        print(entradas)
                        try:
                            child.expect(".*")
                            print("enviou")
                            child.sendline(entradas)

                        except OSError:
                            # interromper, pois não há suporte para a quantidade de saídas definidas
                            # TODO: retornar um erro indicando a falha
                            print("erro")
                    
                    child.expect(pexpect.EOF)
                    resultadoTeste = self.testarSaida(child.before, teste.saida)
                    child.close()
                    resultados.append({"id":teste.id, "status":resultadoTeste})    
                else:
                    raise JuizError("O arquivo de código não foi encontrado.")
        else:
            raise JuizError("O conjunto de test case não é válido.")

        #todo: criar o próprio
        
        return resultados

    def testarSaida(self, resultadoAlgoritmo, resultadoEsperado):
        #print(resultadoAlgoritmo)
        algoritmoCorreto = False

        saidas = re.split("\\r\\n(.*)\\r\\n", resultadoAlgoritmo.decode("utf-8"))
        for texto in saidas:
            if texto == resultadoEsperado:
                algoritmoCorreto = True
                break

        return algoritmoCorreto
                    

    