import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import Query from '../model/firestore/query';
import { sha256 } from 'js-sha256';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase = require('firebase');
import { PerfilUsuario } from '../model/enums/perfilUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Observable<firebase.User>;
  private userDetails: firebase.User;
  

  constructor(private messageService:MessageService, private _firebaseAuth: AngularFireAuth, public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.usuario = _firebaseAuth.authState;
    this.usuario.subscribe(
            (user) => {
              if (user) {
                this.userDetails = user;
              }
              else {
                this.userDetails = null;
              }
            }
          );
   }

  getUsuarioLogado() {
    if (this.isUsuarioLogado()) {
      let json = JSON.parse(sessionStorage.getItem("usuario"));
      if (json.id != undefined && json.perfil != undefined) {
        let usuario = new Usuario(json.id, json.email, json.senha, json.perfil, json.grupoExperimento);
        usuario.minutos = json.minutos;
        return usuario;
      } else {
        throw new Error("Usuário não foi logado corretamente, não há id e/ou perfil informados.");
      }
    }

    return null;
  }

  isUsuarioLogado() {
    return sessionStorage.getItem("usuario") != undefined ? true : false;
  }
  logarFacebook(usuario) {
    return new Observable(observer => {
      Usuario.logar(new Query("email", "==", usuario.email)).subscribe(usuarioLogado => {
        if (usuarioLogado != null) {
          // this.criarSessao(usuarioLogado);
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, err => {
        alert("Erro ao tentar realizar login: " + err.toString());
      });
    })

  }

  logar(usuario: Usuario) {
    return new Observable(observer => {
      Usuario.logar([new Query("email", "==", usuario.email), new Query("senha", "==", sha256(usuario.senha))]).subscribe(usuarioLogado => {
        if (usuarioLogado != null) {
          alert('login existe')
          sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado.stringfiy()));
          observer.next(true);
          observer.complete();
        } else {
          alert('login não existe')
          observer.next(false);
          observer.complete();
        }
      }, err => {
        alert("Erro ao tentar realizar login: " + err.toString());
      });
    });
  }


logarComGoogle(usuario: Usuario){
  return this._firebaseAuth.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
    ).then((res) => {
      let nome = res.user.displayName;
      let email = res.user.email;
      let id = res.user.getIdToken;
       let user = new Usuario(id, email, nome, PerfilUsuario.estudante, null);
       return new Observable(observer => {
         
        Usuario.logar([new Query("email", "==", user.email), new Query("senha", "==", sha256("000"))]).subscribe(usuarioLogado => {
           if (usuarioLogado != null){
           
      
            observer.next(true);
            observer.complete();
            }else{
              this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante'] } }])
              
              
            observer.next(false);
            observer.complete();
            }
    });
  });
});
    
}
 


 
 

    


logarComFacebook() {
  return this._firebaseAuth.auth.signInWithPopup(
    new firebase.auth.FacebookAuthProvider()
  ).then((res) => this.router.navigate(['/main/(principal:home)']));
  
}


redirecionar(){
  if(1==1)
  this.router.navigate(["main", { outlets: { principal: ['home'] } }]);
  else{
    alert("Usuário ou senha inválidos. Você tem certeza que fez o cadastro?") // TODO: mudar para o message service
  }
}
  validarLogin(usuario:Usuario){
    if(usuario.email == "" || usuario.senha == "" || usuario.email == null || usuario.senha == null || usuario.email == undefined || usuario.senha == undefined){
      this.messageService.add({severity:'warn', summary:'Falha ao entrar', detail: "Certifique-se de preencher os campos!"});
      return false;
    }
    else{
      return true;
    }

  }


  logout() {
    sessionStorage.removeItem("usuario");
    return true;
  }
}
