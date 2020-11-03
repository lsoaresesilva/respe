import { AfterViewChecked, Component, OnChanges, OnInit, Query, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import Gamification from 'src/app/model/gamification/gamification';
import Usuario from 'src/app/model/usuario';
import { GamificationFacade } from '../gamification.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranking$:Observable<Gamification[]>;

  constructor(private login:LoginService, private gamification:GamificationFacade) {
  
  }
  ngOnInit(): void {
    
    this.ranking$ = this.gamification.carregarRanking(this.login.getUsuarioLogado().turma);
    
  }
  
}
