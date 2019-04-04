import pexpect
import re
import os

from letscode.model.errors.juizError import JuizError
from letscode.model.testCase import TestCase
from letscode.model.resultadoTestCase import ResultadoTestCase
from letscode.model.questao import Questao
from letscode.model.submissao import Submissao
from letscode.model.erroProgramacao import ErroProgramacao
from letscode.model.errors.erroProgramacaoError import ErroProgramacaoError



class Juiz():

    def __init__(self, submissao):
        
        self.submissao = submissao
            

    # TODO: deve impedir que código maliciosos possam ser executados. desabilitar o uso de import os e outros.
    def validarCodigoMalicioso(self):
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
                        msgRetornoAlgoritmo = child.before.decode("utf-8")
                        # TODO: verificar se há erro no código
                        try:
                            erro = ErroProgramacao(msgRetornoAlgoritmo)
                            raise JuizError("O código apresentou o seguinte erro '"+erro.tipo+"' na linha "+erro.linha)
                        except ErroProgramacaoError: # Não há erro, verificar o resultado test de testcase normalmente
                            resultadoTeste = self.compararSaidaEsperadaComSaidaAlgoritmo(msgRetornoAlgoritmo, teste.saida)
                        finally:
                            child.close()
                    except OSError:
                            resultadoTeste = False

                    
                else:
                    raise JuizError("A quantidade de inputs em seu código é menor que a quantidade de entradas")
                
                resultado = ResultadoTestCase(self.submissao, teste, self.respostaAlgoritmo(msgRetornoAlgoritmo), resultadoTeste)
                
                resultados.append(resultado)    
            else:
                raise JuizError("O arquivo de código não foi encontrado.")
            

        self.salvarResultados(resultados)

        return resultados

    def salvarResultados(self, resultados):
        # TODO: usar transaction, para salvar apenas se todos forem salvos.
        for resultado in resultados:
            resultado.save()
    
    def obterTextosInput(self):
        
        textosInput = []
        inputs = re.findall("input\((.*)\)", self.submissao.codigo)
        if inputs and len(inputs) >0:
            for textoInput in inputs:

                textoInput = textoInput.replace("'", "")
                textoInput= textoInput.replace('"', "")
            
                textosInput.append(textoInput)

                
        return textosInput

    def respostaAlgoritmo(self, resultadoAlgoritmo):
        
        
        textosInput = self.obterTextosInput()

        #saidas = re.split("\\n(.*)\\r\\n", resultadoAlgoritmo)
        saidas = resultadoAlgoritmo.splitlines()
        resultadoAlgoritmo = []
        for saida in saidas:
            saidaInput = False
            for textoInput in textosInput:
                if textoInput in saida:
                    saidaInput = True
                    break

            if not saidaInput:
                resultadoAlgoritmo.append(saida)

                

        return resultadoAlgoritmo

        

    def compararSaidaEsperadaComSaidaAlgoritmo(self, resultadoAlgoritmo, resultadoEsperado):
        algoritmoCorreto = False
        
        #saidas = re.split("\\r\\n(.*)\\r\\n", resultadoAlgoritmo)
        saidas = resultadoAlgoritmo.splitlines()
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


    