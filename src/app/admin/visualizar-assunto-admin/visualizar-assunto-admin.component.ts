import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import QuestaoFechada from 'src/app/model/questoes/questaoFechada';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-assunto-admin',
  templateUrl: './visualizar-assunto-admin.component.html',
  styleUrls: ['./visualizar-assunto-admin.component.css'],
})
export class VisualizarAssuntoAdminComponent implements OnInit {
  assunto$?: Assunto;
  usuario: Usuario;
  questoes$?;

  questaoSelecionada;

  selectedQuestaoFechada: QuestaoFechada;
  items: MenuItem[];

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    public login: LoginService,
    private router: Router
  ) {
    this.questoes$ = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] != null) {
        Assunto.get(params['id']).subscribe((assunto: Assunto) => {
          this.assunto$ = assunto;
          this.questoes$ = this.assunto$.ordenarQuestoes();
        });
      }
    });
    this.usuario = this.login.getUsuarioLogado();

    if (this.usuario.perfil == 3) {
      this.items = [
        {
          label: 'Alterar',
          icon: 'pi pi-check',
          command: (event) => this.alterar(this.selectedQuestaoFechada),
        },
        {
          label: 'Deletar',
          icon: 'pi pi-times',
          command: (event) => this.deletar(this.selectedQuestaoFechada),
        },
      ];
    }
  }

  visualizar() {
    if (this.questaoSelecionada != null) {
      let path = '';
      if (this.questaoSelecionada[0] instanceof QuestaoProgramacao) {
        path = 'atualizacao-questao';
      } else {
        path = 'atualizacao-questao-fechada';
      }

      this.router.navigate([
        'main',
        {
          outlets: {
            principal: [path, this.assunto$.pk(), this.questaoSelecionada[0].id],
          },
        },
      ]);
    }
  }

  reordenar(event) {
    this.assunto$.definirSequenciaQuestoes(this.questoes$);
    this.assunto$.save().subscribe();
  }

  cadastrar() {
    this.router.navigate([
      'main',
      { outlets: { principal: ['escolher-questao', this.assunto$.pk()] } },
    ]);
  }

  alterar(questao: QuestaoFechada) {
    if (questao != undefined) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['atualizar-questao-fechada', this.assunto$.pk(), questao.id] } },
      ]);
    }
  }

  deletar(questao: QuestaoFechada) {
    /* let index = -1;
    for (let i = 0; i < this.assunto.questoesFechadas; i++) {
      if (this.assunto.questoesFechadas[i].id == questao.id) {
        index = i;
        break;
      }
    }

    Assunto.delete(this.assunto.questoesFechadas[index]).subscribe((resultado) => {
      this.messageDelete();
    }); */
  }

  messageDelete() {
    this.messageService.add({
      severity: 'error',
      summary: 'Deletado!',
      detail: ' foi excluido do banco de questões',
    });
  }
}
