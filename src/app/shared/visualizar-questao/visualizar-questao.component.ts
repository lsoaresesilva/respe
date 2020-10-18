import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';

@Component({
  selector: 'app-visualizar-questao',
  templateUrl: './visualizar-questao.component.html',
  styleUrls: ['./visualizar-questao.component.css'],
})
export class VisualizarQuestaoComponent implements OnInit {
  @Input()
  questao?;
  assunto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.questao = new Questao(null, null, null, null, null, [], [], '');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto;
          if (
            assunto['questoesProgramacao'] != undefined &&
            assunto['questoesProgramacao'].length > 0
          ) {
            assunto['questoesProgramacao'].forEach((questao) => {
              if (questao.id == params['questaoId']) {
                this.questao = questao;
              }
            });
          }
        });
      } else {
        if (this.questao == undefined) {
          throw new Error(
            'Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.'
          );
        }
      }
    });
  }

  abrirEditor(questao) {
    this.router.navigate([
      'main',
      { outlets: { principal: ['editor', this.assunto.pk(), questao.id] } },
    ]);
  }

  responder(questao) {
    if (this.loginService.getUsuarioLogado().grupoExperimento == Groups.control) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['editor', this.assunto.pk(), questao.id] } },
      ]);
      return;
    }

    this.router.navigate([
      'main',
      { outlets: { principal: ['self-instruction', this.assunto.pk(), questao.id] } },
    ]);
  }
  alterarQuestao(questao: Questao) {
    if (questao != undefined) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['atualizacao-questao', questao.id] } },
      ]);
    }
  }
}
