import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Gamification from '../model/gamification/gamification';
import Turma from '../model/turma';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class GamificationFacade {

  gamificationModel$:Gamification

  constructor() { }

  inicializar(estudante:Usuario){
    if(estudante != null){
      Gamification.getByEstudante(estudante).subscribe((gamification:Gamification) => {
        if(gamification!= null){
          this.gamificationModel$ = gamification;
         
        }else{
          this.gamificationModel$ = new Gamification(null, 0, estudante, []);
          this.gamificationModel$.save().subscribe(()=>{
          });
        }
        
      });
    }
    
  }

  aumentarPontuacao(estudante, questao, tipo){
    if(this.checkInicializacao()){
      Gamification.aumentarPontuacao(estudante, questao, tipo).subscribe((gamification:Gamification) =>{
        this.gamificationModel$ = gamification;
      });
    }
  }

  checkInicializacao(){
    if(this.gamificationModel$ != null){
      return true;
    }

    throw new Error("Gamification não foi inicializado.")
  }

  carregarRanking(turma, limite=5):Observable<Gamification[]>{
    return Gamification.carregarRanking(turma);
  }
}
