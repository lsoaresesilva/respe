
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Turma from 'src/app/model/turma';
import { LoginService } from 'src/app/juiz/login.service';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  turma$?;
  private usuario;
  minhaTurma;
  

  constructor(private route:ActivatedRoute, private router:Router, private login:LoginService){
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.turma$ = Turma.get(params["turmaId"]);
      
      // EstudanteTurma.get(new Query("estudanteId", "==", this.usuario.id)).subscribe(turma =>{this.minhaTurma = turma
      //   Turma.get(new Query(this.minhaTurma.codigo, "==", this.turma$.codigo)).subscribe(turma=>{
  
      //   });
      // });

    });
   

  }

  visualizarEstudantes(minhaTurma){
    this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes', minhaTurma.codigo] } }]);
  }

  
}