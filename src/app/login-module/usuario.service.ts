import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import { LoginNotFoundError } from '../model/errors/loginNotFound';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private loginCollection: AngularFirestoreCollection<Usuario>;
  
  constructor(private db: AngularFirestore) { 
    this.loginCollection = this.db.collection<Usuario>("login");

  }

  acessar(login:Usuario){
    return new Observable<Usuario>(observer => {
      
      /*this.db.collection("login", ref => {
        ref.where('usuario', '==', login.usuario).where('senha', '==', login.senha)
      }).valueChanges();*/
      let query = this.loginCollection.ref.where('usuario', '==', login.usuario).where('senha', '==', login.senha);
      query.get().then(resultado=>{
        if(!resultado.empty){
          const data = resultado.docs[0].data() as Usuario;
          const id = resultado.docs[0].id;
          let login = new Usuario();
          login.usuario = data.usuario;
          login.senha = data.senha;
          login.id = id;

          observer.next(login);
          observer.complete();
        }else{
          observer.error(new LoginNotFoundError());
        }
      })
      
        
    });
 
  }


  
}
