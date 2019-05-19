import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Observable, iif } from 'rxjs';
import Usuario from '../model/usuario';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { state } from '@angular/animations';
import { PerfilUsuario } from '../model/perfilUsuario';


@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
    
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

  constructor(
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{
    return this.verificarAcesso();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{
    console.log(Usuario.getUsuarioLogado().perfil);
    return this.verificarAcessoPerfil(state.url); 
  }

  verificarAcessoPerfil(url: String) {

    if(!this.verificarAcessoEstudante(url)) {
      this.router.navigate(['/main']);      
      return false;
    } else if(!this.verificarAcessoProfessor(url)) {
      this.router.navigate(['/main']);     
      return false; 
    }

    return true;
  }

  verificarAcessoEstudante(url: String) {
    if(Usuario.getUsuarioLogado().perfil == 1){      
      if (url == "/main/(principal:cadastro-questao)" || url == "/main/(principal:listagem-questoes)" ||
          url == "/main/(principal:cadastro-estudante)" || url == "/main/(principal:listagem-estudantes)") {
          return false;
      }  
    } 
    return true;
  }

  verificarAcessoProfessor(url: String) {
    if(Usuario.getUsuarioLogado().perfil == 2){
      if (url == "/main/(principal:cadastro-questao)" || url == "/main/(principal:listagem-questoes)") {
          return false; 
      }
    }
    
    return true;
  }

  verificarAcesso() {
    if (Usuario.isUsuarioLogado()) {
      return true;
    }
      this.router.navigate([""]);
      return false;
  }

}