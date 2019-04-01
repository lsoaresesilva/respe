from letscode.model.firestore.document import Document

class Estudante(Document):

    def __init__(self, id, nome):
        self.id = id
        self. nome = nome