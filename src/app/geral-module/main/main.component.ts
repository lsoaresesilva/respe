import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
import Gamification from 'src/app/model/gamification/gamification';
import { GamificationFacade } from 'src/app/gamification/gamification.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  itens: MenuItem[];
  usuario: Usuario;
  visibilidadeQuestionario;

  // visibilidadeDialog;

  constructor(
    private router: Router,
    public login: LoginService,
    private apresentacao: ApresentacaoService,
    private gamification:GamificationFacade
  ) {
    this.usuario = this.login.getUsuarioLogado();
    this.gamification.inicializar(this.usuario);
  }

  criarMenu() {
    if (this.usuario.perfil == PerfilUsuario.admin) {
      this.itens = [
        {
          label: 'Turmas',
          command: () => {
            this.router.navigate(['main', { outlets: { principal: ['listagem-turmas'] } }]);
          },
        },
        {
          label: 'Estudantes',
          command: () => {
            this.router.navigate(['main', { outlets: { principal: ['listagem-estudantes'] } }]);
          },
        },
        {
          label: 'Professores',
          command: () => {
            this.router.navigate(['main', { outlets: { principal: ['listagem-estudantes'] } }]);
          },
        },
        {
          label: 'Assuntos',
          command: () => {
            this.router.navigate(['main', { outlets: { principal: ['listagem-assuntos'] } }]);
          },
        },

        {
          label: 'Sair',
          command: () => {
            this.logout();
          },
        },
      ];
    } else if (this.usuario.perfil == PerfilUsuario.professor) {
      this.itens = [
        {
          label: 'Turmas',
          command: () => {
            this.router.navigate(['main', { outlets: { principal: ['listagem-turmas'] } }]);
          },
        },
        {
          label: 'Sair',
          command: () => {
            this.logout();
          },
        },
      ];
    } else {
      if (this.usuario.grupoExperimento == Groups.control) {
        this.itens = [
          {
            label: 'Assuntos',
            command: () => {
              this.router.navigate(['main', { outlets: { principal: ['listagem-assuntos'] } }]);
            },
            id: 'assuntosMenu',
          },
          
        ];
      }
    }
  }

  ngOnInit() {
    this.criarMenu();
    this.apresentarPretestRegulacao();
  }

  abrirDesempenho(){
    this.router.navigate(['main', { outlets: { principal: ['meu-desempenho'] } }]);
  }

  abrirPlanejamento(){
    this.router.navigate(['main', { outlets: { principal: ['listagem-planejamento'] } }]);
  }

  abrirAssuntos(){
    this.router.navigate(['main', { outlets: { principal: ['listagem-assuntos'] } }]);
  }

  abrirRanking(){
    this.router.navigate(['main', { outlets: { principal: ['ranking'] } }]);
  }

  apresentarPretestRegulacao() {
    const usuario = this.login.getUsuarioLogado();
    if (
      usuario != null &&
      typeof usuario.pk === 'function' &&
      usuario.perfil == PerfilUsuario.estudante
    ) {
      QuestionarioAutorregulacao.isRespondido(usuario).subscribe(
        (resultado) => {
          this.visibilidadeQuestionario = !resultado;
          if (resultado) {
            this.apresentacao.apresentarInicializacao(this.usuario);
          }
        },
        (err) => {
          this.visibilidadeQuestionario = false;
        }
      );
    }
  }

  onQuestionarioRespondido(resultado) {
    if (resultado) {
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
      return this.router.navigate(['']);
    }
  }
}
