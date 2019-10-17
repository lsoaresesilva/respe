import Document from '../odm/document';

export class Assunto extends Document {

    static __name = "assuntos";
    nome;
    questoesProgramacao;
    questoesFechadas;

    constructor(id) {
        super(id);
        this.questoesFechadas = [];
        this.questoesProgramacao = [];
    }
}
