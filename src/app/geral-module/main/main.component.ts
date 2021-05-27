import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import { ApresentacaoService } from '../apresentacao.service';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';
import ChatBot from 'src/app/model/chatbot/chatbot';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import TempoOnline from 'src/app/model/analytics/tempoOnline';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  usuario: Usuario;
  visibilidadeQuestionario;

  // visibilidadeDialog;

  constructor(
    private router: Router,
    public login: LoginService,
    private apresentacao: ApresentacaoService,
    private gamification: GamificationFacade
  ) {
    this.usuario = this.login.getUsuarioLogado();

    let c = new ChatBot();
    if (this.usuario.perfil === PerfilUsuario.estudante) {
      this.gamification.inicializar(this.usuario);
    }
  }

  exportarDados(){
    this.router.navigate(['geral/main', { outlets: { principal: ['exportar-dados'] } }]);
  }

  ngOnInit() {
    this.apresentarPretestRegulacao();
  }

  abrirMateriaisEstudo(){
    this.router.navigate(['geral/main', { outlets: { principal: ['aprendizado', 'listar-videos'] } }]);
  }

  abrirTurma(){
    this.router.navigate(['geral/main', { outlets: { principal: ['turma', 'minha-turma'] } }]);
  }
  
  abrirEditorProgramacao(){
    this.router.navigate(['geral/main', { outlets: { principal: ['juiz', 'editor-programacao'] } }]);
  }

  abrirDesempenho() {
    this.router.navigate(['geral/main', { outlets: { principal: ['srl', 'meu-desempenho'] } }]);
  }


  abrirAtividadesGrupo() {
    this.router.navigate(['geral/main', { outlets: { principal: ['cscl', 'listagem-atividades-grupo'] } }]);
  }

  abrirDiario() {
    this.router.navigate(['geral/main', { outlets: { principal: ['srl', 'listagem-diarios'] } }]);
    
  }

  abrirAssuntos() {
    this.router.navigate(['geral/main', { outlets: { principal: ['juiz', 'listar-assuntos'] } }]);
    
  }

  abrirAssuntosAdmin() {
    this.router.navigate(['geral/main', { outlets: { principal: ['listar-assuntos-admin'] } }]);
  }

  abrirRanking() {
    this.router.navigate(['geral/main', { outlets: { principal: ['gamification', 'ranking'] } }]);
  }

  abrirListagemTurmas() {
    this.router.navigate(['geral/main', { outlets: { principal: ['listagem-turmas'] } }]);
  }

  abrirListagemGrupoProfessor(){
    this.router.navigate(['geral/main', { outlets: { principal: ['listagem-atividades-grupo-professor'] } }]);
  }

  abrirListagemDiario(){
    this.router.navigate(['geral/main', { outlets: { principal: ['listagem-diarios-professor'] } }]);
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
