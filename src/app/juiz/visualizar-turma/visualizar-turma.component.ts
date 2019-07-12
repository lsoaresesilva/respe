
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Estudante from 'src/app/model/estudante';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  estudantes;

  constructor(private route: ActivatedRoute) {
    this.estudantes = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buscarEstudante(params['turmaId'])
    });
  }

  buscarEstudante(turmaId) {

    Usuario.getAll(new Query("perfil", "==", PerfilUsuario.estudante)).subscribe(estudantes=>{
      EstudanteTurma.getAll(new Query("turmaId", "==", turmaId)).subscribe(estudantesTurma => {

        for(let i = 0; i < estudantes.length; i++){
          for (let j = 0; j < estudantesTurma.length; j++) {
            
            if(estudantes[i].id == estudantesTurma[j].estudanteId){
              this.estudantes.push(estudantes[i]);
            }
    
          }
        }
        
      });
    });

    
  }
}