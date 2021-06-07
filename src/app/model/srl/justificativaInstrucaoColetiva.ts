import Usuario from "../usuario";

export default class JustificativasAutoInstrucao{
    static construir(justificativa: any) {
        return new JustificativasAutoInstrucao(new Usuario(justificativa.estudanteId, null, null, null, null, null), justificativa.dificuldade, justificativa.texto);
    }

    constructor(public estudante:Usuario, public dificuldade, public texto){

    }

    objectToDocument(){
        let document = {texto:this.texto, dificuldade:this.dificuldade};

        if(this.estudante != null){
            document["estudanteId"] = this.estudante.pk();
        }else if(this["estudanteId"] != null){
            document["estudanteId"] = this["estudanteId"];
        }

        return document;
    }

    



    
}