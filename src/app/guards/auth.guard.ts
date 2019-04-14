import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Usuario from '../model/usuario';


@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate, CanLoad {
    
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
    console.log('verificando se o usario pode acessar o modulo!');
    return this.verificarAcesso();
  }

  verificarAcesso() {

    if (Usuario.isUsuarioLogado()) {
      console.log("usuário logado");
      return true;
    }
    this.router.navigate([""]);
    return false;
  }

}