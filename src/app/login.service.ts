import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import Login from './model/login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginCollection: AngularFirestoreCollection<Login>;
  
  constructor(private db: AngularFirestore) { 
    this.loginCollection = this.db.collection<Login>("login");

  }

  acessar(login:Login){
    return new Observable<Login>(observer => {
      
      /*this.db.collection("login", ref => {
        ref.where('usuario', '==', login.usuario).where('senha', '==', login.senha)
      }).valueChanges();*/
      let query = this.loginCollection.ref.where('usuario', '==', login.usuario).where('senha', '==', login.senha);
      query.get().then(resultado=>{
        if(!resultado.empty){
          const data = resultado.docs[0].data() as Login;
          const id = resultado.docs[0].id;
          let login = new Login();
          login.usuario = data.usuario;
          login.senha = data.senha;
          login.id = id;

          observer.next(login);
          observer.complete();
        }
      })
      /*.snapshotChanges().subscribe(resultado=>{
        if(resultado.length > 0){
          const data = resultado[0].payload.doc.data() as Login;
          const id = resultado[0].payload.doc.id;

          return { id, ...data } as Login;
        }
      });*/
        
    });
 
  }


  
}
