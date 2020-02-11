import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import geradorCodigo from 'src/app/util/geradorCodigo';
import GeradorCodigo from 'src/app/util/geradorCodigo';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import { RespostaQuestaoExperimento } from 'src/app/model/experimento/old_check_to_delete/respostaQuestaoExperimento';
import { PreTesteComponent } from 'src/app/experimento/pre-teste/pre-teste.component';
import PosTeste from 'src/app/model/experimento/old_check_to_delete/posTeste';
import { Groups } from 'src/app/model/experimento/groups';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import { ApresentacaoService } from '../apresentacao.service';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  itens: MenuItem[];
  usuario: Usuario;
  visibilidadeQuestionario;

  //visibilidadeDialog;


  constructor(private router: Router, private login: LoginService, private apresentacao: ApresentacaoService) {
    this.usuario = this.login.getUsuarioLogado();
  }


  criarMenu() {
    if (this.usuario.perfil == PerfilUsuario.admin) {
      this.itens = [
        {
          label: 'Turmas',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

        },
        {
          label: 'Estudantes',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }

        },
        {
          label: 'Professores',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }

        },
        {
          label: 'Assuntos',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

        },

        {
          label: 'Sair',
          command: () => { this.logout() }
        }
      ];
    } else if (this.usuario.perfil == PerfilUsuario.professor) {
      this.itens = [
        {
          label: 'Turmas',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

        },
        {
          label: 'Sair',
          command: () => { this.logout() }

        },
      ];
    } else {

      if (this.usuario.grupoExperimento == Groups.control) {
        this.itens = [
          {
            label: 'Assuntos',
            command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) },
            id: 'assuntosMenu'

          },
          {
            label: 'Sair',
            command: () => { this.logout() },
            id: 'sairMenu',
          }
        ];
      } else {
        this.itens = [
          {
            label: 'Planejamentos',
            command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) },
            id: 'planejamentoMenu'
          },/*
          {
            label: 'Minha turma',
            command: () => { this.router.navigate(["main", { outlets: { principal: ['minha-turma'] } }]) },
    
           },*/
          {
            label: 'Meu desempenho',
            command: () => { this.router.navigate(["main", { outlets: { principal: ['meu-desempenho'] } }]) },
            id: 'meuDesempenhoMenu',
          },
          {
            label: 'Sair',
            command: () => { this.logout() },
            id: 'sairMenu',
          }
        ];
      }

    }
  }

  ngOnInit() {
    this.criarMenu();
    this.apresentarPretestRegulacao();

  }

  apresentarPretestRegulacao() {
    let usuario = this.login.getUsuarioLogado();
    if (usuario != null && typeof usuario.pk === "function" && usuario.perfil == PerfilUsuario.estudante) {
      QuestionarioAutorregulacao.getByQuery(new Query("usuarioId", "==", usuario.pk())).subscribe(resultado => {
        this.visibilidadeQuestionario = false;
        this.apresentacao.apresentarInicializacao(this.usuario);
      }, err => {
        this.visibilidadeQuestionario = true;
      })
    }

  }

  onQuestionarioRespondido(resultado){
    if(resultado){
      this.apresentacao.apresentarInicializacao(this.usuario);
    }
  }





  /*
  apresentarPretest() {
    RespostaQuestaoExperimento.isFinalizado(this.login.getUsuarioLogado()).subscribe(resultado => {
      if (resultado) {
        this.apresentarPostest();
      } else {
        this.visibilidadeDialog = !resultado;
      }
  
    })
  }
  
  apresentarPostest() {
    PosTeste.apresentar(this.login.getUsuarioLogado()).subscribe(resultado => {
      this.visibilidadeDialog = resultado;
    })
  }*/


  logout() {
    if (this.login.logout()) {
      return this.router.navigate([""])
    }
  }


}
