import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import Query from '../model/firestore/query';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getUsuarioLogado() {
    if (this.isUsuarioLogado()) {
      let json = JSON.parse(sessionStorage.getItem("usuario"));
      if (json.id != undefined && json.perfil != undefined) {
        let usuario = new Usuario(json.id, null, null, json.perfil);
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
      Usuario.getAll([new Query("email", "==", usuario.email), new Query("senha", "==", sha256(usuario.senha))]).subscribe(resultado => {
        if (resultado.length > 0) {
          sessionStorage.setItem('usuario', JSON.stringify({ id: resultado[0].id, perfil: resultado[0].perfil }));
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



  logout() {
    sessionStorage.removeItem("usuario");
    return true;
  }
}
