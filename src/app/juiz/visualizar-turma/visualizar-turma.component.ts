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
 
  sub:any;
  id;
  estudantesTurma;
  resultado;
  estudantesSelecionados;

  

  constructor(private route: ActivatedRoute) { 
    //this.estudantesSelecionados= new Estudante (null,null,null);
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      
        EstudanteTurma.getAll(new Query("turmaId", "==", this.id)).subscribe(estudanteTurma => {this.estudantesTurma = estudanteTurma });

        for(let i =0; i<this.estudantesTurma.length;i++){
          Estudante.get(this.estudantesTurma[i].estudanteId).subscribe(resultado =>{ 
            this.estudantesSelecionados.push(resultado);
            });
        }
        
   
      });
    };
  }

    
    
  
 
 
   
       
 
    
  

    

  
  
