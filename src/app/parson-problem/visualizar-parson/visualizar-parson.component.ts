import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import { Dificuldade } from 'src/app/model/enums/dificuldade';
import { RespostaQuestaoParson } from 'src/app/model/juiz/respostaQuestaoParson';
import QuestaoParsonProblem from 'src/app/model/questoes/parsonProblem';
import SegmentoParson from 'src/app/model/questoes/segmentoParson';

@Component({
  selector: 'app-visualizar-parson',
  templateUrl: './visualizar-parson.component.html',
  styleUrls: ['./visualizar-parson.component.css'],
})
export class VisualizarParsonComponent implements OnInit {
  questao?: QuestaoParsonProblem;
  usuario;
  respostaQuestaoFechada?: RespostaQuestaoParson;
  assunto: Assunto;
  segmentoSelecionado;

  constructor(
    private route: ActivatedRoute,
    private login: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          this.assunto = assunto;

          if (assunto['questoesFechadas'] != undefined && assunto['questoesFechadas'].length > 0) {
            this.questao = assunto['getQuestaoParsonById'](params['questaoId']);
            this.usuario = this.login.getUsuarioLogado();
            this.respostaQuestaoFechada = new RespostaQuestaoParson(
              null,
              this.usuario,
              [],
              this.questao
            );

            RespostaQuestaoParson.getRespostaQuestaoEstudante(this.questao, this.usuario).subscribe(
              (respostaUsuario: RespostaQuestaoParson) => {
                if (respostaUsuario != null) {
                  this.respostaQuestaoFechada = respostaUsuario;
                }
              }
            );
          }
        });
      } else {
        throw new Error(
          'Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.'
        );
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  enviar() {
    this.respostaQuestaoFechada.save().subscribe((resposta) => {
      if (this.questao.isSequenciaCorreta(this.respostaQuestaoFechada)) {
        this.messageService.add({
          severity: 'success',
          summary: 'Parabéns',
          detail: 'Resposta correta!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ops...',
          detail: 'Resposta incorreta!',
        });
      }
    });
  }
}
