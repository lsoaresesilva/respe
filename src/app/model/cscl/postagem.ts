import { Observable } from 'rxjs';
import { Collection, Document, date } from '../firestore/document';
import Turma from '../turma';
import Usuario from '../usuario';
import RespostaPostagem from './respostaPostagem';


import * as firebase from 'firebase';

@Collection('postagens')
export default class Postagem extends Document {

  data: Date;
  respostas: RespostaPostagem[] = [];

  constructor(public id, public titulo, public texto, public estudante: Usuario, public turma: Turma) {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();

    document['data'] = firebase.firestore.Timestamp.fromDate(this.data);


    if(this.estudante != null && this.estudante.pk() != null){
      document["estudante"] = {id:this.estudante.pk(), nome:this.estudante.nome};
    }

    if(this.turma != null && this.turma.pk() != null){
      document["turmaId"] = this.turma.pk();
    }

    if(this.respostas != null && this.respostas.length > 0){
      document["respostas"] = []
      this.respostas.forEach(resposta=>{
        document["respostas"].push(resposta.objectToDocument());
      })
    }



    return document;
  }

  static get(id):Observable<Postagem> {
    return new Observable(observer=>{
      super.get(id).subscribe(postagem=>{
        if(postagem != null){
          postagem.estudante = new Usuario(postagem.estudante.id, null, null, null, null, postagem.estudante.nome);
          postagem.respostas = RespostaPostagem.construir(postagem.respostas);
          observer.next(postagem);
          observer.complete();
        }
      })
    })
  }

  validar() {
    if (
      this.titulo == null ||
      this.titulo == '' ||
      this.texto == null ||
      this.texto == '' ||
      this.estudante == null ||
      this.turma == null
    ) {
      return false;
    }
    return true;
  }

}
