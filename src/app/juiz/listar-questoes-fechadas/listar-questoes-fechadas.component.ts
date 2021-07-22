import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import { RespostaQuestaoFechada } from 'src/app/model/respostaQuestaoFechada';
import Query from 'src/app/model/firestore/query';
import QuestaoFechada from 'src/app/model/sistema-aprendizagem/questoes/questaoFechada';
import { Assunto } from 'src/app/model/sistema-aprendizagem/assunto';

@Component({
  selector: 'app-listar-questoes-fechadas',
  templateUrl: './listar-questoes-fechadas.component.html',
  styleUrls: ['./listar-questoes-fechadas.component.css'],
})
export class ListarQuestoesFechadasComponent implements OnInit {
  @Input('assunto') assunto?;

  selectedQuestao: QuestaoFechada;
  items: MenuItem[];
  respostasAluno;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private login: LoginService
  ) {
    this.respostasAluno = [];
  }

  ngOnInit() {
    RespostaQuestaoFechada.getAll(
      new Query('usuarioId', '==', this.login.getUsuarioLogado().pk())
    ).subscribe((respostasAluno) => {
      this.carregarStatusRespostasAluno(respostasAluno);
    });

    this.ordernarPorSequencia(this.assunto.questoesFechadas);

    if (this.login.getUsuarioLogado().perfil == 3) {
      this.items = [
        {
          label: 'Alterar',
          icon: 'pi pi-check',
          command: (event) => this.alterar(this.selectedQuestao),
        },
        {
          label: 'Deletar',
          icon: 'pi pi-times',
          command: (event) => this.deletar(this.selectedQuestao),
        },
      ];
    }
  }

  visualizar(questao: QuestaoFechada) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['visualizacao-questao-fechada', this.assunto.pk(), questao.id] } },
    ]);
  }

  alterar(questao: QuestaoFechada) {
    if (questao != undefined) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['cadastro-questao-fechada', this.assunto.pk(), questao.id] } },
      ]);
    }
  }

  carregarStatusRespostasAluno(respostasAlunoUsuario) {
    this.respostasAluno = [];

    for (let i = 0; i < this.assunto.questoesFechadas.length; i++) {
      if (this.respostasAluno[i] == undefined) this.respostasAluno[i] = 'Responder';

      respostasAlunoUsuario.map((respostaUsuario) => {
        if (respostaUsuario.questaoId == this.assunto.questoesFechadas[i].id) {
          this.respostasAluno[i] = QuestaoFechada.isRespostaCorreta(
            this.assunto.questoesFechadas[i],
            respostaUsuario
          );
        }
      });
    }
  }

  ordernarPorSequencia(questoes: QuestaoFechada[]) {
    questoes.sort((a, b) => a.sequencia - b.sequencia);
    this.assunto.questoesFechadas = questoes;
  }

  deletar(questao: QuestaoFechada) {
    let index = -1;
    for (let i = 0; i < this.assunto.questoesFechadas; i++) {
      if (this.assunto.questoeFechadas[i].id == questao.id) {
        index = i;
        break;
      }
    }

    Assunto.delete(this.assunto.questoesFechadas[index]).subscribe((resultado) => {
      this.messageDelete();
    });
  }

  messageDelete() {
    this.messageService.add({
      severity: 'error',
      summary: 'Deletado!',
      detail: ' foi excluido do banco de questões',
    });
  }
  messageView() {
    this.messageService.add({
      severity: 'info',
      summary: 'Questao visualizado',
      detail: 'informações sobre a questão',
    });
  }

  cadastrar() {
    this.router.navigate(['geral/main', { outlets: { principal: ['cadastro-questao-fechada'] } }]);
  }
}
