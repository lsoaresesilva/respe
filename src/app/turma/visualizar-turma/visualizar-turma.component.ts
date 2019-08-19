
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Turma from 'src/app/model/turma';
import { LoginService } from 'src/app/juiz/login.service';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  turma$?;
  private usuario;

  constructor(private route:ActivatedRoute, private router:Router, private login:LoginService){ 
    this.usuario = this.login.getUsuarioLogado();
    console.log(this.usuario.perfil)

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.turma$ = Turma.get(params["turmaId"]);

    });

  }
  visualizarEstudantes(turma){
    this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes', turma.pk()] } }]);
  }
  enviarMaterial(turma){
    this.router.navigate(["main", { outlets: { principal: ['enviar-material', turma.pk()] } }]);

  }

  
}