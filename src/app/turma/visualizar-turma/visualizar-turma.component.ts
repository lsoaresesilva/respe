
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Turma from 'src/app/model/turma';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import { LoginService } from 'src/app/login-module/login.service';
import Query from 'src/app/model/firestore/query';
import { Observable } from 'rxjs';




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
      
      if(params["turmaId"] != null){
        this.turma$ = Turma.get(params["turmaId"])
      }else{
        if(this.usuario.turmaId != null)
          this.turma$ = Turma.get(this.usuario.turmaId);
      }
      

    });
   

  }

  visualizarEstudantes(minhaTurma){
    this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes', minhaTurma.codigo] } }]);
  }
  enviarMaterial(turma){
    this.router.navigate(["main", { outlets: { principal: ['enviar-material', turma.pk()] } }]);

  }

  adicionarMaterial(turma){
    this.router.navigate(["main", { outlets: { principal: ['envio-material', turma.pk()] } }]);
  }
  listarMateriais(turma){
    this.router.navigate(["main", { outlets: { principal: ['listar-materiais', turma.pk()] } }]);
  }
}