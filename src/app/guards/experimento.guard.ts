import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login-module/login.service';
import { Observable } from 'rxjs';
import { Groups } from '../model/experimento/groups';

@Injectable({
  providedIn: 'root'
})

export class ExperimentoGuard  {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  paginasRestritas;

  constructor(
    private router: Router,
    private login: LoginService
  ) {
    this.paginasRestritas = [
      "self-instruction",
      "listagem-planejamento"
    ];
   }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {


    return this.verificarAcesso(state.url, this.login.getUsuarioLogado());
  }


  verificarAcesso(rota, usuario) {

    if (usuario != null && rota != "") {
      if (usuario.grupoExperimento == Groups.control) {
        alert("Apenas estudantes autorizados podem acessar essa página.")
        this.router.navigate(["/main"]);
        return false;
      }

      return true;
    }

    return false;

  }





}
