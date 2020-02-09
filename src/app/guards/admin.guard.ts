import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Usuario from '../model/usuario';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { LoginService } from '../login-module/login.service';
import Turma from '../model/turma';
import { PerfilUsuario } from '../model/enums/perfilUsuario';


@Injectable({
    providedIn: 'root'
  })

export class AdminGuard implements CanActivate, CanLoad {
    
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private login:LoginService
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

  verificarAcesso() {
    let usuario = this.login.getUsuarioLogado();
    if (usuario.perfil == PerfilUsuario.admin) {
      return true;
    }
      this.router.navigate([""]);
      return false;
  }
  
}