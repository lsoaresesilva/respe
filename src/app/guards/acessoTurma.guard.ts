import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Turma from '../model/turma';
import Query from '../model/firestore/query';
import { Component } from '@angular/core';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { LoginService } from '../login-module/login.service';
import { PerfilUsuario } from '../model/enums/perfilUsuario';

@Injectable({
  providedIn: 'root'
})

export class TurmaGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private login: LoginService, private messageService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {



    return new Observable(observer => {
      this.acessoTurma(route.params['turmaId']).subscribe(
        retorno => {
          observer.next(retorno);
          observer.complete();
        }
      )
    });
  }


  acessoTurma(codigoTurma) {
    return new Observable<boolean>(observer => {
      let usuario = this.login.getUsuarioLogado();
      if (usuario != null && codigoTurma != null) {
        if (usuario.perfil == PerfilUsuario.estudante && usuario["codigoTurma"] == codigoTurma) {
          observer.next(false);
          observer.complete();
        }
      } else {
        Turma.get(codigoTurma).subscribe(turma => {
          if (turma != undefined) {
            if (turma["professorId"] == usuario.pk()) {
              observer.next(true);

            } else {
              observer.next(false);
            }
            observer.complete();
          }else{
            observer.next(false);
          }
        })
      }
      

    });
  }


}