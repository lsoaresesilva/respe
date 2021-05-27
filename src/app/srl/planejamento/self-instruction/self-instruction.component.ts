import { Component, OnInit, Input } from '@angular/core';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import { AutoInstrucao } from 'src/app/model/autoInstrucao';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/login-module/login.service';
import { Assuntos } from 'src/app/model/enums/assuntos';
import { MessageService } from 'primeng/api';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';

@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css'],
})
export class SelfInstructionComponent implements OnInit {
  autoInstrucao: AutoInstrucao;
  questao;
  assunto;
  msgs;
  condicoes;
  repeticoes;
  funcoes;
  vetores;
  display;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private messageService: MessageService,
    private apresentacaoService:ApresentacaoService
  ) {
    this.questao = new QuestaoProgramacao(null, null, null, null, null, [], [], '', null);
    this.msgs = [];
    this.condicoes = false;
    this.repeticoes = false;
    this.funcoes = false;
    this.vetores = false;
    let dialogExibida = sessionStorage.getItem("dialogTipsSelfInstruction");
    if((dialogExibida == null || dialogExibida != "true")){
      this.display = true;
      sessionStorage.setItem('dialogTipsSelfInstruction', "true");
    }
  }

  ngOnInit() {
    this.autoInstrucao = new AutoInstrucao(
      null,
      this.login.getUsuarioLogado(),
      this.questao,
      "",
      "",
      null,
      null,
      null,
      null
    );
    this.getQuestao();
  }

  fecharDialog(){
    this.apresentacaoService.apresentarSelfInstruction(this.login.getUsuarioLogado());
  }

  contagemCaracteres(referencia: string) {
    if(referencia != null){
      let restante = 20 - referencia.length;
      return restante <= 0 ? 0 : restante;
    }
    
  }

  getQuestao() {
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto;
          this.questao = this.assunto.getQuestaoProgramacaoById(params['questaoId']);

          if (this.questao != null && this.questao.id != null) {
            this.apresentarPerguntas(this.questao.assuntos);
            AutoInstrucao.getByEstudanteQuestao(
              this.login.getUsuarioLogado().pk(),
              this.questao.id
            ).subscribe((autoInstrucao) => {
              if (autoInstrucao != null) {
                this.autoInstrucao = autoInstrucao;
              }
            });
          }
          /*if (assunto["questoesProgramacao"] != undefined && assunto["questoesProgramacao"].length > 0) {
            assunto["questoesProgramacao"].forEach(questao => {
              if (questao.id == params["questaoId"]) {

                this.questao = questao;



              }
            });
          }*/
        });
      } else {
        throw new Error(
          'Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.'
        );
      }
    });
  }

  salvar() {
    this.autoInstrucao.questao = this.questao;
    if (this.autoInstrucao.validar(this.assunto)) {
      this.autoInstrucao.save().subscribe(
        (resultado) => {
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['juiz', 'editor', this.assunto.pk(), this.questao.id] } },
          ]);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha ao salvar',
            detail: 'Houve um problema no servidor. Tente novamente em alguns instantes.',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha ao salvar',
        detail: 'Antes de avançar é preciso responder todas as perguntas.',
      });
    }
  }

  apresentarPerguntas(assuntos) {
    if (assuntos != null) {
      assuntos.forEach((assunto) => {
        switch (assunto.nome) {
          case Assuntos.repeticoes: {
            this.autoInstrucao.repeticoes = "";
            this.repeticoes = true;
            break;
          }
          case Assuntos.condicoes: {
            this.autoInstrucao.condicoes = "";
            this.condicoes = true;
            break;
          }
          case Assuntos.funcoes: {
            this.autoInstrucao.funcoes = "";
            this.funcoes = true;
            break;
          }
          case Assuntos.vetores: {
            this.autoInstrucao.vetores = "";
            this.vetores = true;
            break;
          }
        }
      });
    }
  }
}
