import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';


import Usuario from 'src/app/model/usuario';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {
  private turma;
  private resultado;
  private estudante;
   estudantesNomes:String[]=[];
   estudanteTurma = [];
  id;
  sub:any;
  Estudante;

  constructor(private route: ActivatedRoute) { 
   
  }

  ngOnInit() {
    
    this.sub=this.route.params.subscribe(params => {
      this.id =params['id'];
      EstudanteTurma.getAll(new Query("turmaId","==",this.id)).subscribe(resultado =>{ this.resultado=resultado;
        for(let i=0;i<this.estudanteTurma.length;i++){
          Usuario.get(this.estudanteTurma[i].estudanteId).subscribe(resultado=>{this.estudante=resultado
            this.estudantesNomes.push(this.estudante.nome);
          });
        }
      });
    });

  }

  BuscarEstudante(estudanteTurma){
    for(let i=0;i<estudanteTurma.length;i++){
      Usuario.get(estudanteTurma[i].estudanteId).subscribe(resultado=>{this.estudante=resultado
        this.estudantesNomes.push(this.estudante.nome);
      });
    }

  }

}