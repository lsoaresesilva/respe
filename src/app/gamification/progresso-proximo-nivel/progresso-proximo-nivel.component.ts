import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Gamification from 'src/app/model/gamification/gamification';
import Usuario from 'src/app/model/usuario';
import { GamificationFacade } from '../gamification.service';

@Component({
  selector: 'app-progresso-proximo-nivel',
  templateUrl: './progresso-proximo-nivel.component.html',
  styleUrls: ['./progresso-proximo-nivel.component.css']
})
export class ProgressoProximoNivelComponent implements OnInit {

  usuario:Usuario;
  gamification$?;

  progresso;

  constructor(private login:LoginService, public gamification:GamificationFacade) { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    let x = changes;
  }

  ngOnInit(): void {
    this.usuario = this.login.getUsuarioLogado();
    /* Gamification.getByEstudante(this.usuario).subscribe((gamification) => {
      this.gamification$ = gamification;
      this.progresso = this.gamification$?.calcularPercentualProximoLevel();
    }); */
  }


}
