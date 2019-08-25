import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Usuario from '../model/usuario';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { LoginService } from '../juiz/login.service';
import Turma from '../model/turma';
import EstudanteTurma from '../model/estudanteTurma';
import Query from '../model/firestore/query';
import {Component} from '@angular/core';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })

export class TurmaGuard implements CanActivate,CanLoad {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  turmaId;
  resultado;

 constructor(private router: Router, private login:LoginService,private messageService:MessageService) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Observable<boolean> | boolean{
    console.log("acesso a turma");
    console.log(this.router.url);


    this.turmaId=route.params['turmaId'];

    return new Observable(observer=>{ this.acessoTurma().subscribe(
      retorno=>{
        this.resultado = retorno;
        console.log(retorno);
        observer.next(this.resultado);
        observer.complete();
      }
     )
    });
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log('verificando se o usuario pode acessar o modulo!');
    return new Observable(observer=>{ this.acessoTurma().subscribe(
      retorno=>{
         this.resultado = retorno;
         console.log(retorno)
      }
    )
    });
  }

  acessoTurma() {
    return new Observable(observer => {
      let usuario = this.login.getUsuarioLogado();
     if(usuario != null && this.turmaId != null){
      EstudanteTurma.getAll([new Query("estudanteId", "==",usuario.pk()),new Query("turmaId", "==",this.turmaId)]).subscribe(resultado => {
       
        if(resultado.length === 0){
          this.messageService.add({severity:'warning', summary:'Não autorizado', detail: "Apenas pessoas dessa turma tem permissão!"});
          //alert("Só pessoas dessa turma tem permissão!");
          observer.next(false);
          observer.complete();
         
          
        }else{
          observer.next(true);
          observer.complete();
        
        }
      });
    }else{
      //alert("erro no estudante ou na turma");
      this.messageService.add({severity:'error', summary:'Erro', detail: "Erro no estudante ou na turma.."});
    }
    });
  }

  
}