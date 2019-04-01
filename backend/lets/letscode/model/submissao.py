from letscode.model.firestore.document import Document
from letscode.model.firestore.document import Collection

@Collection("submissao")
class Submissao(Document):

    def __init__(self, codigo, estudante, questao):
        self.id = ""
        self.codigo = codigo
        self.estudante = estudante
        self.questao = questao
        self.resultadosTestsCases = []

    def objectToDocument(self):
        document = super().objectToDocument()
        document["estudanteId"] = self.estudante.id
        document["questaoId"] = self.questao.id

        return document

    def toJson(self):
        
        resultados = []
        for resultado in self.resultadosTestsCases:
            resultados.append(resultado.toJson())
        
        return {
            "id":self.id,
            "resultados":resultados
        }