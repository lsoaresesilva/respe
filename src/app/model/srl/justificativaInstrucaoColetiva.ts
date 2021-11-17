import Usuario from "../usuario";

export default class JustificativasAutoInstrucao{

    static construir(justificativa: any) {
        return new JustificativasAutoInstrucao(new Usuario(justificativa.estudante.id, null, null, null, null, justificativa.estudante.nome), justificativa.dificuldade, justificativa.texto, justificativa.avaliacaoDificuldades);
    }

    constructor(public estudante:Usuario, public dificuldade, public texto, public avaliacaoDificuldades){

    }

    objectToDocument(){
        let document = {texto:this.texto, dificuldade:this.dificuldade, avaliacaoDificuldades:this.avaliacaoDificuldades};

        let estudanteId = null;
        let nome = null;
        if(this.estudante != null){
            if(this.estudante.pk != null)
                estudanteId = this.estudante.pk();
            else
                estudanteId = this.estudante["id"];

            nome = this.estudante.nome;
        }

        if(estudanteId != null){
            document["estudante"] = {id:estudanteId, nome:this.estudante.nome}
        }

        return document;
    }

    isFinalizada(){
      if(this.isAvaliacaoRealizada() && this.dificuldade != null && this.texto != ""){
        return true;
      }

      return false;
    }

    isAvaliacaoRealizada() {

      if (this.avaliacaoDificuldades == '') {
        return false;
      }

      return true;
    }

    getDificuldade() {
      if (this.dificuldade == null) {
        return '';
      }

      return this.dificuldade;
    }

    getDificuldades() {
      if (this.avaliacaoDificuldades == '') {
        return '';
      }

      return this.avaliacaoDificuldades;
    }


    getJustificativa() {
      if (this.texto == '') {
        return '';
      }

      return this.texto;
    }






}
