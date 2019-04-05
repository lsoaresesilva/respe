export class respostaAutoreflexao {
    id?: string;
    respostaUm: string;
    respostaDois: string;

    toDocumentUm() {
        return {
            respostaUm: this.respostaUm,
            id: this.id,
        };
    }
    toDocumentDois() {
        return {
            respostaDois: this.respostaDois,
            id: this.id,
        };
    }

}