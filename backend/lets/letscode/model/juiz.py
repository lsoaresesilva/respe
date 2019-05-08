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

    def isQuestaoValida(self):
        if type(self.submissao) == Submissao and type(self.submissao.questao) != Questao:
            raise JuizError("Uma questão precisa ser informada")

    def executarVisualizacao(self, arquivo):
        self.isQuestaoValida()
        inputs = ""
        jsonTrace = ""

        teste = self.submissao.questao.testsCases[0]
        if teste != None:
            for entrada in teste.entradas:
                inputs += entrada+","

        inputs = inputs[:-1] # remove a , que foi acrescentada a mais.

        if arquivo.is_arquivo_valido():
            if self.matchInputCodigo(teste.entradas):
                path = os.path.dirname(os.path.realpath(__file__))
                path = path+'/pythontutor/generate_json_trace.py'
                child = pexpect.spawn('python3 '+path+' '+arquivo.nome()+' -i ['+inputs+']') #BUG: tem de recuperar o dir do projeto.. para poder executar
                child.expect(pexpect.EOF)
                jsonTrace = child.before.decode("utf-8")
                erro = ErroProgramacao(jsonTrace)
                if erro.possuiErroVisualizacao() == False:
                    return jsonTrace
                else:
                    raise JuizError("O código apresentou o seguinte erro '"+erro.tipo)

            else:
                raise JuizError(
                    "A quantidade de inputs em seu código é menor/maior que a quantidade de entradas")
        else:
            raise JuizError("O arquivo de código não foi encontrado.")

        return jsonTrace

    def executarTestes(self, arquivo):
        resultados = []

        self.isQuestaoValida()

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
                            if erro.possuiErroExecucao():
                                raise JuizError(
                                    "O código apresentou o seguinte erro '"+erro.tipo+"' na linha "+erro.linha)
                        except ErroProgramacaoError:  # Não há erro, verificar o resultado test de testcase normalmente
                            resultadoTeste = self.compararSaidaEsperadaComSaidaAlgoritmo(
                                msgRetornoAlgoritmo, teste.saida)
                        finally:
                            child.close()
                    except OSError:
                            resultadoTeste = False

                else:
                    raise JuizError(
                        "A quantidade de inputs em seu código é menor que a quantidade de entradas")

                resultado = ResultadoTestCase(None, self.submissao, teste, self.respostaAlgoritmo(
                    msgRetornoAlgoritmo, teste.entradas), resultadoTeste)

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
        if inputs and len(inputs) > 0:
            for textoInput in inputs:

                textoInput = textoInput.replace("'", "")
                textoInput = textoInput.replace('"', "")

                textosInput.append(textoInput)

        return textosInput

    def respostaAlgoritmo(self, resultadoAlgoritmo, entradas):

        textosInput = self.obterTextosInput()

        #saidas = re.split("\\n(.*)\\r\\n", resultadoAlgoritmo)
        saidas = resultadoAlgoritmo.splitlines()
        resultadoAlgoritmo = []
        for saida in saidas:
            # Se for um texto que apareceu em razão da entrada do test case ou do input do algoritmo, deve ignorar
            textoEntradaInput = False
            for textoInput in textosInput:  # OU se for uma das entradas do testcase, também ignorar
                if textoInput in saida:
                    textoEntradaInput = True
                    break
            for textoEntrada in entradas:  # OU se for uma das entradas do testcase, também ignorar
                if textoEntrada == saida:
                    textoEntradaInput = True
                    break

            if not textoEntradaInput:
                resultadoAlgoritmo.append(saida)

        if len(resultadoAlgoritmo) > 0:
            return resultadoAlgoritmo[0]
        else:
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
