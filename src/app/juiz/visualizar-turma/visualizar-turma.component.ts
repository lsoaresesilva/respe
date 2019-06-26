import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {
  turmas: Turma[];
  turma;
  estudante;
  Estudante;
  estudantesTurma;
  id;
  sub: any;
  

  constructor(private route: ActivatedRoute) { 
    this.Estudante = new EstudanteTurma (null,null, null);
    this.turma = new Turma (null, null,null,null);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
     // EstudanteTurma.get(this.id).subscribe(resultado =>{
      //this.turma= resultado
      console.log(this.id);
      EstudanteTurma.getAll(new Query("turmaId", "==", this.id)).subscribe(estudantesTurma => {this.estudantesTurma = estudantesTurma});
      // Estudante.get(this.estudantesTurma.estudanteId).subscribe(estudante => {this.estudante = estudante});

      });
    // });
    console.log(this.estudantesTurma)
  }
    
       
  }
    
  

    

  

