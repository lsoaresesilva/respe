import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection, Document } from '../../firestore/document';
import { Assunto } from './assunto';

@Collection('conceitos')
export default class Conceito extends Document {


  constructor(public id, public nome:string, public assunto: Assunto){
    super(id);
  }

  static getAll(query = null, orderBy = null) {
    return super.getAll(query, orderBy).pipe<any[]>(map(conceitos=>{
      conceitos.map(conceito=>{
        conceito.assunto = new Assunto(conceito.assuntoId, "")
      });
      return conceitos;
    }));
  }

  static construir(conceitos: any[]) {
    let objetosConceitos: Conceito[] = [];

    if (conceitos != null) {
        conceitos.forEach(conceito => {
          if(conceito != null) {
            objetosConceitos.push(new Conceito(conceito, null, null));
          }
        });
    }

    return objetosConceitos;
}

  objectToDocument(){
    if(this.id != null){
      /* const document = {
        conceitoId:this.id
      };

      return document; */
      return this.id;
    }
  }
}
