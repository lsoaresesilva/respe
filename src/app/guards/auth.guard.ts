import { Injectable, OnDestroy } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login-module/login.service';
import Turma from '../model/turma';


@Injectable({
    providedIn: 'root'
  })

export class AuthGuard  {

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


  verificarAcesso() {
    if (this.login.isUsuarioLogado()) {
      return true;
    }
      this.router.navigate([""]);
      return false;
  }

}
