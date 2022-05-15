import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Tutor } from '../../../model/tutor';
import { LoginService } from '../../../login-module/login.service';
import { Assunto } from '../../../model/questoes/assunto';

@Component({
  selector: 'app-card-desempenho',
  templateUrl: './card-desempenho.component.html',
  styleUrls: ['./card-desempenho.component.css']
})
export class CardDesempenhoComponent implements OnChanges {

  @Input()
  respostas;
  @Input()
  assuntos;

  progresso;

  constructor(private loginService:LoginService) {
    this.progresso = 0;
  }

  ngOnChanges() {
    if(this.respostas != null && this.assuntos != null){
      this.progresso = Assunto.calcularProgressoGeral(this.assuntos, this.respostas);
    }

  }

}
