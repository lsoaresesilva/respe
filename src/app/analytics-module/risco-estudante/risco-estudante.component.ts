import { Component, OnInit } from '@angular/core';
import { Tutor } from 'src/app/model/tutor';
import Submissao from 'src/app/model/submissao';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'risco-estudante',
  templateUrl: './risco-estudante.component.html',
  styleUrls: ['./risco-estudante.component.css']
})
export class RiscoEstudanteComponent implements OnInit {

  risco;

  constructor() { 

    this.risco = 0;

  }

  ngOnInit() {
    Submissao.getAll(new Query("estudanteId", "==", "12345")).subscribe(submissoes=>{
      this.risco = Tutor.calcularErrorQuotient(submissoes)*100;
    })
    
  }

}
