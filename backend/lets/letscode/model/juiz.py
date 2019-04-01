import pexpect
import re
import os

from letscode.model.errors.juizError import JuizError
from letscode.model.testCase import TestCase
from letscode.model.resultadoTestCase import ResultadoTestCase
from letscode.model.questao import Questao
from letscode.model.submissao import Submissao




class Juiz():

    def __init__(self, submissao):
        
        self.submissao = submissao
            

    # TODO: deve impedir que código maliciosos possam ser executados. desabilitar o uso de import os e outros.
    def validarCodigoMalicioso():
        pass

    def executarTestes(self, arquivo):
        resultados = []

        if type(self.submissao) == Submissao and type(self.submissao.questao) != Questao:
            raise JuizError("Uma questão precisa ser informada")

        for teste in self.submissao.questao.testsCases:
        
            if arquivo.is_arquivo_valido():
                if self.matchInputCodigo(teste.entradas):
                
                    child = pexpect.spawn('python3 '+arquivo.nome())
            
                    try:
                        
                        for entradas in teste.entradas:
                            
                            child.expect(".*")
                            child.sendline(entradas)
                            
                        child.expect(pexpect.EOF)
                        resultadoTeste = self.compararSaidaEsperadaComSaidaAlgoritmo(child.before, teste.saida)
                        child.close()
                    except OSError:
                            resultadoTeste = False
                    
                else:
                    resultadoTeste = False
                
                resultado = ResultadoTestCase(self.submissao, teste, resultadoTeste)
                
                resultados.append(resultado)    
            else:
                raise JuizError("O arquivo de código não foi encontrado.")
            

        self.salvarResultados(resultados)

        return resultados

    def salvarResultados(self, resultados):
        # TODO: usar transaction, para salvar apenas se todos forem salvos.
        for resultado in resultados:
            resultado.save()
    
    def compararSaidaEsperadaComSaidaAlgoritmo(self, resultadoAlgoritmo, resultadoEsperado):
        algoritmoCorreto = False
        
        saidas = re.split("\\r\\n(.*)\\r\\n", resultadoAlgoritmo.decode("utf-8"))
        for texto in saidas:
            if texto == resultadoEsperado:
                algoritmoCorreto = True
                break

        return algoritmoCorreto
    
    # Verifica se o código dispõe do quantitativo de inputs necessários para a quantidade de entradas
    def matchInputCodigo(self, entradas):
        totalInputs = re.findall("input", self.submissao.codigo)

        if len(entradas) == len(totalInputs):
            return True
        return False


    