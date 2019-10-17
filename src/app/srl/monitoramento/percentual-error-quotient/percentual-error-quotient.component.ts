import { Component, OnInit, Input } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-percentual-error-quotient',
  templateUrl: './percentual-error-quotient.component.html',
  styleUrls: ['./percentual-error-quotient.component.css']
})
export class PercentualErrorQuotientComponent implements OnInit {

  @Input() estudante;
  @Input() percentual;

  constructor() { }

  ngOnInit() {
    if (this.estudante != undefined) {
      Submissao.getAll(new Query("estudanteId", "==", this.estudante.pk()), "data").subscribe(submissoes => {
        let errorQuotient = Tutor.calcularErrorQuotient(submissoes);
        if(errorQuotient != null)
          this.percentual = errorQuotient * 100;
        else
          this.percentual = errorQuotient;
      })
    }
  }

}
