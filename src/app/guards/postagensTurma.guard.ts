import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import Usuario from '../model/usuario';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { LoginService } from '../juiz/login.service';
import Turma from '../model/turma';


@Injectable({
    providedIn: 'root'
  })

export class PostagensTurmaGuard implements CanActivate {
    
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

    
    return this.verificarUsuarioPertenceTurma();
  }

   verificarUsuarioPertenceTurma(){
    let usuario = this.login.getUsuarioLogado();
    let turmaId = "ZlSbQCJmqt1q0uEGhH5A";
    let turma:Turma;

    
        Turma.get(turmaId).subscribe(turmaBanco =>{
          turmaBanco=turma;
     
            turma.estudantes.forEach(estudante =>{

              if(estudante == usuario.pk()){
                return true;
              } 
              this.router.navigate([""]);
              return false;
           
        });

    });

   this.router.navigate([""]);
   return false;
  }  
}