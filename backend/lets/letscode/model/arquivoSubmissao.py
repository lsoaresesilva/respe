import random
import string
import os

class ArquivoSubmissao():

    def __init__(self, codigo):
        self.arquivo = self.criarArquivo()
        self.escreverCodigoNoArquivo(codigo)

    def criarArquivo(self):
        nomeArquivo = self.gerarNomeArquivo()
        print(nomeArquivo)
        arquivo = open(nomeArquivo,"w+")

        return arquivo

    def nome(self):
        return self.arquivo.name

    def apagarArquivo(self):
        #TODO: verificar se o arquivo existe
        self.arquivo.close()
        try:
            print(os.path.realpath(self.arquivo.name))
            os.remove(os.path.realpath(self.arquivo.name))
        except OSError:
            print("maoe")
        
        
        

    def escreverCodigoNoArquivo(self, codigo):
        codigo = codigo.split("\n")

        
        for linha in codigo:
            # TODO: verificar antes se o arquivo está aberto
            self.arquivo.write(linha+"\n")

        self.arquivo.flush()
        return True

    # obtido em: https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python
    def gerarNomeArquivo(self, size=6, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))+".py"