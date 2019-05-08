import re

from letscode.model.errors.erroProgramacaoError import ErroProgramacaoError

class ErroProgramacao():
    def __init__(self, erro):
        self.texto = erro
        self.tipo = ""
        self.linha = 0
        
    def possuiErroVisualizacao(self):
        tipoErro = re.findall("([a-zA-Z]+):", self.texto)
        if tipoErro:
            return True
        return False

    def possuiErroExecucao(self, erro):
        
        linha = re.findall("line ([0-9]+)", erro)
        tipoErro = re.findall("([a-zA-Z]+):", erro)
        
        erro = False

        if tipoErro and linha:
            if(len(tipoErro) == 1) and (len(linha) == 1):
                self.tipo = tipoErro[0]
                self.linha = linha[0]
            else:
                erro = True
        else:
            erro = True   

        
        
        if erro:
            raise ErroProgramacaoError("Mensagem de erro é inválida.")
