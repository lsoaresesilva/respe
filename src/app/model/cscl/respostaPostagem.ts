import Usuario from '../usuario';
import { Util } from '../util';


import * as firebase from 'firebase/compat';

export default class RespostaPostagem {

  data: Date;

  constructor(public id, public texto, public estudante:Usuario) {
    if (id == null) {
      this.id = Util.uuidv4();
      this.data = new Date();
    } else {
      this.id = id;
    }
  }

  objectToDocument() {
    let document = {};
    document['id'] = this.id;
    document['texto'] = this.texto;

    document['data'] = firebase.firestore.Timestamp.fromDate(this.data);

    if(this.estudante != null && this.estudante.pk() != null){
      document['estudante'] = {id:this.estudante.pk(), nome: this.estudante.nome};
    }
    

    return document;
  }

  static construir(respostas: any[]) {
    const objetos: RespostaPostagem[] = [];

    if (respostas != null) {
      respostas.forEach((resposta) => {
        let r = new RespostaPostagem(
          resposta.id,
          resposta.texto,
          new Usuario(resposta.estudante.id, null, null, null, null, resposta.estudante.nome)
        )
        r.data = Util.firestoreDateToDate(resposta.data);
        objetos.push(
          r
        );
      });
    }

    return objetos;
  }

  validar() {
    if (
      this.texto == null ||
      this.texto == '' ||
      this.estudante == null ||
      this.estudante.pk() == undefined
    ) {
      return false;
    }
    return true;
  }
}
