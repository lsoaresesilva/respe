import { Component, OnInit, Input } from '@angular/core';
import { Tutor } from 'src/app/model/tutor';
import Submissao from 'src/app/model/submissao';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'risco-estudante',
  templateUrl: './risco-estudante.component.html',
  styleUrls: ['./risco-estudante.component.css']
})
export class RiscoEstudanteComponent implements OnInit {

  percentualErrorQuotient;
  desempenhoPorErrorQuotient;
  @Input() estudante;

  constructor(private loginService: LoginService) {

    this.percentualErrorQuotient = 0;

  }

  ngOnInit() {
    if (this.estudante != undefined) {
      Submissao.getAll(new Query("estudanteId", "==", this.estudante.pk()), "data").subscribe(submissoes => {
        let errorQuotient = Tutor.calcularErrorQuotient(submissoes);
        this.percentualErrorQuotient = errorQuotient * 100;
        this.desempenhoPorErrorQuotient = Tutor.desempenhoEstudante(errorQuotient);
      })
    }
  }

}
