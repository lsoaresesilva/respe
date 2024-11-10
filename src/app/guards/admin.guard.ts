import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login-module/login.service';
import { PerfilUsuario } from '../model/enums/perfilUsuario';
import { tap } from 'rxjs/operators';


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

  canLoad(route: Route): boolean | Observable<boolean>  {
    return this.verificarAcesso();
  }

  verificarAcesso(): boolean {
    const usuario = this.login.getUsuarioLogado();
    if(usuario && usuario.perfil == PerfilUsuario.admin){
      return true;
    }

    return false;
    
  }
}
