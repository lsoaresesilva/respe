import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CodigoInvalidoErro } from '../model/errors/codigoInvalidoErro';
import { map } from 'rxjs/operators';
import Usuario from '../model/usuario';
import ErroFactory from '../model/erroFactory';
import Submissao from '../model/submissao';
import Estudante from '../model/estudante';
import { Questao } from '../model/questao';

@Injectable({
  providedIn: 'root'
})
export class SubmissoesService {

  envioCodigoCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {

    this.envioCodigoCollection = this.db.collection<Submissao>("envioCodigo");

  }

  salvar(envioCodigo: Submissao) {
    /*return new Observable(observer => {
      this.envioCodigoCollection.add(envioCodigo.toFireBase()).then(resultado => {
        envioCodigo.id = resultado.id;
        observer.next();
        observer.complete();
      }).catch(() => {
        observer.error(new CodigoInvalidoErro());
      })
    });*/

  }

  listar(): Observable<any[]> {
    return new Observable(observer => {
      this.envioCodigoCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Submissao;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(resultados => {
        observer.next(resultados);
        observer.complete();
      })

    });

  }

  listarPorLogin(login: Usuario): Observable<any> {
    return new Observable(observer => {
      let query = this.envioCodigoCollection.ref.where('loginId', '==', login.id);
      query.get().then(resultado => {
        if (!resultado.empty) {
          let codigosEnviados = [];
          resultado.docs.forEach(codigoEnviados => {
            const data = codigoEnviados.data();
            const id = codigoEnviados.id;

            let login = new Usuario();
            login.id = data.loginId;

            // TODO: pegar o objeto estudante pelo id dele
            let codigoEnviado = new Submissao(data.codigo, new Estudante(), new Questao());
            //codigoEnviado.erro = ErroFactory.create(data.erro.texto);
            codigosEnviados.push(codigoEnviado);
          })
          
          observer.next(codigosEnviados);
          observer.complete();
        } else {
          observer.error(new Error("Não foi localizado nenhum código enviado por este usuário."));
        }
      })

    });



  }

  getPorStatus(status){

    let s1 = new Submissao(null, null, null);
    let s2 = new Submissao(null, null, null);
    let s3 = new Submissao(null, null, null);

    if(status == "sucesso"){
      return [s1, s2];
    }else{
      return [s3];
    }
  }
}
