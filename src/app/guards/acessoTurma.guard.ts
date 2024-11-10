import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Turma from '../model/turma';
import Query from '../model/firestore/query';
import { Component } from '@angular/core';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { LoginService } from '../login-module/login.service';
import { PerfilUsuario } from '../model/enums/perfilUsuario';
import Usuario from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TurmaGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  URL = environment.URL;

  constructor(private router: Router, private http: HttpClient, private login: LoginService, private messageService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {


    return this.acessoTurma(route.params['turmaId']);
  }


  async acessoTurma(codigoTurma: string): Promise<boolean> {
    const usuario: Usuario = this.login.getUsuarioLogado(); // Recupera o usuário logado

    if (usuario && codigoTurma) {
      try {
        // Chamada ao endpoint verifica-acesso-turma passando o código da turma
        const response: any = await this.http
          .get<any>(`${this.URL}${codigoTurma}/verifica-acesso`)
          .toPromise();

        // Verifica a resposta do endpoint
        if (response.acesso) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Erro ao verificar acesso à turma:', error);
        return false;
      }
    } else {
      // Se o usuário ou código da turma não for válido, retorna false
      return false;
    }
  }


}
