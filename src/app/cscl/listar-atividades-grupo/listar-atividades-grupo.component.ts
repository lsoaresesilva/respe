import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-listar-atividades-grupo',
  templateUrl: './listar-atividades-grupo.component.html',
  styleUrls: ['./listar-atividades-grupo.component.css']
})
export class ListarAtividadesGrupoComponent implements OnInit {

  atividades
  pesquisaTurmas;
  turmaSelecionada;

  constructor(private login:LoginService, private router: Router) { }

  ngOnInit(): void {

    AtividadeGrupo.getAll(new Query("estudantes", "array-contains", this.login.getUsuarioLogado().pk())).subscribe(as => {
      this.atividades = as;
    });
  }

  pesquisarTurma(event) {

    Turma.search(new Query("nome", "==", event.query)).subscribe(turmas => {
        this.pesquisaTurmas = turmas;
        
    });

  }

  selecionarTurma(event){
    if(this.turmaSelecionada != null){
      // Recuperar todas as atividades vinculadas à turma.
    }
  }

  criar(){
    this.router.navigate(['main', { outlets: { principal: ['criar-grupo'] } }]);
  }



}
