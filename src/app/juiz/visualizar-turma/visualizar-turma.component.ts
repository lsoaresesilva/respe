import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Query from 'src/app/model/firestore/query';

import Usuario from 'src/app/model/usuario';
import EstudanteTurma from 'src/app/model/estudanteTurma';

@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {
  private turma;
  private resultado;
  private estudante;
  private nomes:String[]=[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.turma = params['turmaId'];

      EstudanteTurma.getAll(new Query("turmaId","==",this.turma)).subscribe(resultado =>{ this.resultado=resultado;
      this.BuscarEstudante(this.resultado);
      });
    });

  }

  BuscarEstudante(estudanteTurma){
    for(let i=0;i<estudanteTurma.length;i++){
      Usuario.get(estudanteTurma[i].estudanteId).subscribe(resultado=>{this.estudante=resultado
        this.nomes.push(this.estudante.nome);
      });
    }

  }

}
  

    

  

