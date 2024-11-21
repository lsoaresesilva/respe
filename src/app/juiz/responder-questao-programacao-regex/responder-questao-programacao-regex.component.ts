import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import Editor from 'src/app/model/editor';
import ErroSintaxeVariavel from 'src/app/model/errors/analise-pre-compilacao/erroSintaxeVariavel';
import Query from 'src/app/model/database/query';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { RespostaQuestaoProgramacaoRegex } from 'src/app/model/aprendizagem/questoes/respostaQuestaoProgramacaoRegex';
import { ChatbotService } from 'src/app/chatbot/chatbot.service';

import { ApresentacaoService } from '../../geral-module/apresentacao.service';
import { QuestaoProgramacaoRegex } from 'src/app/model/aprendizagem/questoes/questaoProgramacaoRegex';
import { InterpretadorPythonService } from '../editor/interpretador-python.service';

declare function carregarIde(
  readOnly,
  callback,
  instance,
  callbackOnEditorLoad,
  codigo
): any;

@Component({
  selector: 'app-responder-questao-programacao-regex',
  templateUrl: './responder-questao-programacao-regex.component.html',
  styleUrls: ['./responder-questao-programacao-regex.component.css'],
})
export class ResponderQuestaoProgramacaoRegexComponent implements OnInit, AfterViewChecked {
  questao;
  assunto: Assunto;
  isEditorPronto;
  editorCodigo?: Editor;
  resultado;
  respostaQuestao;
  erroProgramacao;
  usuario;

  constructor(private route: ActivatedRoute, 
    private login: LoginService, 
    private interpretadorPython: InterpretadorPythonService,
    private apresentacao: ApresentacaoService, 
    private chatbotService: ChatbotService) {
    this.isEditorPronto = false;
  }

  ngAfterViewChecked() {
    //this.apresentacao.apresentarEditorRegex(this.login.getUsuarioLogado());
  }


  ngOnInit(): void {
    this.usuario = this.login.getUsuarioLogado();
    if (this.questao == null) {
      this.route.params.subscribe((params) => {
        QuestaoProgramacaoRegex.get(params['questaoId']).subscribe((questao) => {
          this.questao = questao as QuestaoProgramacaoRegex;
          this.editorCodigo = new Editor(this.interpretadorPython, this.questao);
          this.respostaQuestao = new RespostaQuestaoProgramacaoRegex(null, this.usuario, [], false, this.questao);
          
        });
      });
    }
   /*  this.route.params.subscribe((params) => {
      if (params['assuntoId'] != null && params['questaoId'] != null) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto as Assunto;
          this.questao = this.assunto.getQuestaoRegexById(params['questaoId']);
          //this.chatbotService.sendDados([this.questao.sequencia, this.questao.nomeCurto, this.questao.pk]);
        });
      }
    }); */
  }

  onEditorCarregado(){
    
    this.isEditorPronto = true;
    
    //Editor.getInstance().setCodigo.next("");
    RespostaQuestaoProgramacaoRegex.getByQuery([
      new Query('questao_id', '==', this.questao.pk),
    ]).subscribe(
      (respostaUsuario: RespostaQuestaoProgramacaoRegex) => {
        if (respostaUsuario != null) {
          this.respostaQuestao = respostaUsuario;
          this.resultado = this.respostaQuestao.isRespostaCorreta;
          //Editor.getInstance().codigo.next(this.respostaQuestao.algoritmo.join('\n'));
        }
      }
    );

    
  }

  ngAfterViewInit(): void {

    let _this = this;

  
    setTimeout(function () {
      carregarIde(
        false,
        function () {
          _this.isEditorPronto = true;
        },
        _this,
        _this.carregarEditor,
        ""
      );
    }, 500);
  }

  carregarEditor(instance, editor) {
    instance.editorCodigo.instanciaMonaco = editor;
    instance.onEditorCarregado();

    instance.editorCodigo.instanciaMonaco.onKeyDown(function (e) {
      let linhaAtual = editor.getPosition().lineNumber;
      if(instance.erroAtivo != null){
        if(instance.erroAtivo.linha == linhaAtual){
          instance.removerDestaquesErro()
        }
      }

    }); 
  }

  executar() {
    if (this.questao != null && this.questao.executar != null) {
      let codigo = this.editorCodigo.codigoAtual.split('\n');
      if (Array.isArray(codigo)) {
        /* codigo = codigo.map((linha) => {
          return linha.replace('\\"', "'");
        }); */

        let erros = this.editorCodigo.identificarErros(codigo)

        if (erros.hasErros()) {
          this.resultado = false;
          this.erroProgramacao = erros.getPrimeiroErro().mensagem;
        } else {
          let resposta = this.questao.executar(codigo);
          this.resultado = resposta.resultado;
          if (!this.resultado){
            this.erroProgramacao = 'Seu algoritmo não apresenta erro de sintaxe, mas não produziu o resultado esperado. Erro na linha: '+resposta.linha;

          }

          else this.erroProgramacao = null;
        }

        if(this.respostaQuestao.pk == null){
          this.respostaQuestao = new RespostaQuestaoProgramacaoRegex(
            null,
            this.login.getUsuarioLogado(),
            codigo,
            this.resultado,
            this.questao
          );
          
        }else{
          this.respostaQuestao.algoritmo = codigo;
          this.respostaQuestao.isRespostaCorreta = this.resultado;
          
        }

        this.respostaQuestao.save().subscribe((r) => {
          this.respostaQuestao = r;
        });

        
      }
    }
  }
}
