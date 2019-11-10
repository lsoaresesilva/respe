import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import Query from '../model/firestore/query';
import { sha256 } from 'js-sha256';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private messageService:MessageService) { }

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

  logar(usuario: Usuario) {

    return new Observable(observer => {
      Usuario.logar([new Query("email", "==", usuario.email), new Query("senha", "==", sha256(usuario.senha))]).subscribe(usuarioLogado => {
        if (usuarioLogado != null) {
          sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado.stringfiy()));
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, err => {
        alert("Erro ao tentar realizar login: " + err.toString());
      });
    });
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
