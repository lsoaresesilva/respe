import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import Editor from 'src/app/model/editor';
import ErroSintaxeVariavel from 'src/app/model/errors/analise-pre-compilacao/erroSintaxeVariavel';
import Query from 'src/app/model/firestore/query';
import { RespostaQuestaoProgramacaoRegex } from 'src/app/model/questoes/respostaQuestaoProgramacaoRegex';

@Component({
  selector: 'app-responder-questao-programacao-regex',
  templateUrl: './responder-questao-programacao-regex.component.html',
  styleUrls: ['./responder-questao-programacao-regex.component.css'],
})
export class ResponderQuestaoProgramacaoRegexComponent implements OnInit {
  questao;
  assunto: Assunto;
  isEditorPronto;
  editorCodigo?: Editor;
  resultado;
  respostaQuestao;
  erroProgramacao;

  constructor(private route: ActivatedRoute, private login: LoginService) {
    this.isEditorPronto = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != null && params['questaoId'] != null) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto as Assunto;
          this.questao = this.assunto.getQuestaoRegexById(params['questaoId']);
        });
      }
    });
  }

  onContainerReady(event) {
    this.isEditorPronto = true;
    this.editorCodigo = Editor.getInstance();
    RespostaQuestaoProgramacaoRegex.getRecentePorQuestao(
      this.questao,
      this.login.getUsuarioLogado()
    ).subscribe((resposta) => {
      this.respostaQuestao = resposta;
      if (this.respostaQuestao != null) {
        this.resultado = this.respostaQuestao.isRespostaCorreta;
        Editor.getInstance().codigo.next(this.respostaQuestao.algoritmo.join('\n'));
      }
    });
  }

  executar() {
    if (this.questao != null && this.questao.executar != null) {
      let codigo = this.editorCodigo.codigoAtual;
      if (Array.isArray(codigo)) {
        /* codigo = codigo.map((linha) => {
          return linha.replace('\\"', "'");
        }); */

        let erros = ErroSintaxeVariavel.erros(codigo);

        if (erros.length > 0) {
          this.resultado = false;
          this.erroProgramacao = erros[0].mensagem;
        } else {
          let resposta = this.questao.executar(codigo);
          this.resultado = resposta.resultado;
          if (!this.resultado){
            this.erroProgramacao = 'Seu algoritmo não apresenta erro de sintaxe, mas não produziu o resultado esperado. Erro na linha: '+resposta.linha;

          }
            
          else this.erroProgramacao = null;
        }

        let resposta = new RespostaQuestaoProgramacaoRegex(
          null,
          this.login.getUsuarioLogado(),
          codigo,
          this.resultado,
          this.questao
        );
        resposta.save().subscribe((r) => {});
      }
    }
  }
}
