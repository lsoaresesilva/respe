import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { Observable, of, throwError } from 'rxjs';
import Query from '../model/database/query';
import { sha256 } from 'js-sha256';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import RegistroLogin from '../model/registroLogin';

import { RastrearTempoOnlineService } from '../srl/rastrear-tempo-online.service';
import Gamification from '../model/gamification/gamification';
import Turma from '../model/turma';
import { PerfilUsuario } from '../model/enums/perfilUsuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  URL = environment.URL;
  
  constructor(
    private messageService: MessageService,
    private rastrearTempoOnline: RastrearTempoOnlineService,
    private http: HttpClient
  ) {}

  getUsuarioLogado(): Usuario {

    const usuarioSalvo = sessionStorage.getItem('usuario');

    if (usuarioSalvo) {
      return Usuario.fromJson(JSON.parse(usuarioSalvo))
    } 

    /*  */
  }
    /* if (this.isUsuarioLogado()) {
      const json = JSON.parse(sessionStorage.getItem('usuario'));
      return Usuario.fromJson(json);
    }

    return null; */
  

  isUsuarioLogado() {
    return sessionStorage.getItem('usuario') != undefined ? true : false;
  }

  criarSessao() {
    return new Observable(observer=>{
      const usuario = this.getUsuarioLogado();
      if( usuario == null){
        const url = this.URL + 'usuario';
        this.http.get<Usuario>(url).pipe(
          tap((usuario: Usuario) => {
            sessionStorage.setItem('usuario', JSON.stringify(usuario)); // Salva o usuário no localStorage
          }),
          catchError((error) => {
            console.error('Erro ao buscar o usuário:', error);
            return of(null); // Em caso de erro, retorna null
          })
        ).subscribe(res=>{
          observer.next(res);
          observer.complete();
        });
      }else{
        observer.next();
        observer.complete();
      }
    })
    
    
  }

  criarSessaoAdmin(usuario: Usuario) {
    let usuarioString = JSON.stringify(usuario.stringfiy());
    sessionStorage.setItem('usuario', usuarioString);
  }


  logar(usuario: Usuario) {
    const email = usuario.email;
    const senha = sha256(usuario.senha);
    const url = this.URL + 'usuario/login';
    return this.http.post<any>(url, { email: email, password: senha })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Credenciais inválidas'));
        }
        return throwError(() => error);
      })
    )
    .toPromise()
    .then(async response => {
      if (response) {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        await this.criarSessao().toPromise();
      }
    })
    .catch(error => {
      // Rejeitar a Promise com a mensagem de erro lançada em caso de erro 400
      throw error;
    });
  }

  private parseUsuario(respostaJSON: any): Usuario | null {
    const objUsuario = JSON.parse(respostaJSON['usuario']);
  
    if (objUsuario != null && objUsuario.fields != null) {
      objUsuario.fields.id = objUsuario.pk;
  
      const objEstudante = JSON.parse(respostaJSON['estudante']);
      if (objEstudante != null && objEstudante.fields != null) {
        objUsuario.fields.grupoExperimento = objEstudante.fields['grupo_experimento'];
      }else{
        throw new Error("Houve uma falha ao recuperar os dados do estudante.");
      }
  
      const usuarioLogado = Usuario.fromJson(objUsuario.fields);
      usuarioLogado.turma = Turma.fromJson(objEstudante.fields);
     
      return usuarioLogado;
    }
  
    return null;
  }

  validarLogin(usuario: Usuario) {
    if (
      usuario.email == '' ||
      usuario.senha == '' ||
      usuario.email == null ||
      usuario.senha == null ||
      usuario.email == undefined ||
      usuario.senha == undefined
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Falha ao entrar',
        detail: 'Certifique-se de preencher os campos!',
      });
      return false;
    } else {
      return true;
    }
  }

  signInWithFacebook() {
    /* return this.firebaseAuth.auth.signInWithPopup(
			new firebase.auth.FacebookAuthProvider()
		) */
  }

  signInWithGoogle() {
    /* return this.firebaseAuth.auth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
		) */
  }

  logout1() {
    /* this.firebaseAuth.auth.signOut()
			.then((res) => this.router.navigate(['/'])); */
  }

  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('dialogTipsAutorregulacao');
    return true;
  }
}
