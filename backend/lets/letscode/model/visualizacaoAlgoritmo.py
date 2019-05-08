class VisualizacaoAlgoritmo():

    def __init__(self, codigo):
        self.codigo = codigo

    def executar(self):
        arquivo = ArquivoSubmissao(self.codigo)
        arquivo.apagarArquivo()