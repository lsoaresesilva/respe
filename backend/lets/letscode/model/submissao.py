from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection

@Collection("submissao")
class Submissao(Document):

    def __init__(self, id, codigo, estudante, questao):
        super().__init__(id)
        self.codigo = codigo
        self.estudante = estudante
        self.questao = questao
        self.resultadosTestsCases = []
        self.saida = None

    def objectToDocument(self):
        document = super().objectToDocument()
        document["estudanteId"] = self.estudante.id
        document["questaoId"] = self.questao.id

        return document

    def toJson(self):
        
        resultados = []
        for resultado in self.resultadosTestsCases:
            resultados.append(resultado.toJson())

        saidaAlgoritmo = []
        for resultado in self.saida.split("\r\n"):
            if resultado != "" and resultado != "\r" and resultado != "\n":
                saidaAlgoritmo.append(resultado)
        
        return {
            "id":self.id,
            "resultados":resultados,
            "saida":saidaAlgoritmo
        }

        