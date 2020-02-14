import { Component, OnInit, Input } from '@angular/core';
import ConsoleEditor from 'src/app/model/consoleEditor';
import ErroServidor from 'src/app/model/errors/erroServidor';
import Submissao from 'src/app/model/submissao';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-responder-questao-programacao-lite',
  templateUrl: './responder-questao-programacao-lite.component.html',
  styleUrls: ['./responder-questao-programacao-lite.component.css']
})
export class ResponderQuestaoProgramacaoLiteComponent implements OnInit {

  @Input()
  questao;
  @Input()
  assunto;
  submissao;


  

  consoleEditor:ConsoleEditor;

  constructor(private login:LoginService) {


    this.consoleEditor = new ConsoleEditor();

  }

  ngOnInit() {
    if(this.assunto != null && this.questao != null){
      if (this.login.getUsuarioLogado() != null) {
        Submissao.getRecentePorQuestao(this.questao, this.login.getUsuarioLogado()).subscribe(submissao => {
          if(submissao != null)
            this.submissao = submissao;
          //this.pausaIde = false;
        })
  
  
      }
    }
  }

  onEditorError(submissao) {
    this.submissao = this.prepararSubmissao(submissao);
    this.consoleEditor.erroServidor = null;
    this.consoleEditor.submissao = this.submissao;
  }

  onEditorSubmit(submissao) {
    
    this.submissao = this.prepararSubmissao(submissao);
    this.consoleEditor.erroServidor = null;
    this.consoleEditor.submissao = this.submissao;
  }

  onServidorError(erroServidor){
    let erro = ErroServidor.construir(erroServidor);
    this.consoleEditor.erroServidor = erro;
  }

  prepararSubmissao(submissao){
    if(submissao != undefined){
      let _submissaoClone = new Submissao(submissao.pk(), submissao.codigo, submissao.estudante, submissao.questao);
      _submissaoClone["estudanteId"] = submissao.estudanteId;
      _submissaoClone["assuntoId"] = submissao.assuntoId;
      _submissaoClone.data = submissao.data;
      _submissaoClone.erro = submissao.erro;
      _submissaoClone.resultadosTestsCases = submissao.resultadosTestsCases;
      _submissaoClone.saida = submissao.saida;
      return _submissaoClone;
    }

    return null;
  }

}
