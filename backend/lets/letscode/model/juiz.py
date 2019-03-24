import pexpect
import re
import os

from letscode.model.arquivoSubmissao import ArquivoSubmissao

class Juiz():

    def __init__(self, codigo, testsCases):
        self.codigo = codigo
        self.testsCases = testsCases
        self.arquivo = ArquivoSubmissao(codigo)

    def analisar(self):
        
        self.executarTestes()

    
            
    def executarTestes(self):
        #TODO: deve retornar um array indicando o status para cada teste
        for teste in self.testsCases:
            # TODO: verificar se o arquivo existe
            
            child = pexpect.spawn('python3 '+self.arquivo.nome())
            for entradas in teste.entradas:
                try:
                    child.expect(".*")
                    child.sendline(entradas)

                except OSError:
                    # interromper, pois não há suporte para a quantidade de saídas definidas
                    # TODO: retornar um erro indicando a falha
                    print("erro")
            
            child.expect(pexpect.EOF)
            resultadoTeste = self.testarSaida(child.before, teste.saida)
            child.close()
            print(resultadoTeste)

    def testarSaida(self, resultadoAlgoritmo, resultadoEsperado):
        #print(resultadoAlgoritmo)
        algoritmoCorreto = False

        saidas = re.split("\\r\\n(.*)\\r\\n", resultadoAlgoritmo.decode("utf-8"))
        for texto in saidas:
            if texto == resultadoEsperado:
                algoritmoCorreto = True
                break

        return algoritmoCorreto
                    

    