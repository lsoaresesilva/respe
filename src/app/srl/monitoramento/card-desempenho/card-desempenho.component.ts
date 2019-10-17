import { Component, OnInit, Input } from '@angular/core';
import { Tutor } from 'src/app/model/tutor';

@Component({
  selector: 'app-card-desempenho',
  templateUrl: './card-desempenho.component.html',
  styleUrls: ['./card-desempenho.component.css']
})
export class CardDesempenhoComponent implements OnInit {

  @Input() errorQuotient;

  desempenhoPorErrorQuotient;

  constructor() { }

  ngOnInit() {
    this.desempenhoPorErrorQuotient = Tutor.desempenhoEstudante(this.errorQuotient);
  }

}
