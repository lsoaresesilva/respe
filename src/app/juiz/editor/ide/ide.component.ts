import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { LoginService } from 'src/app/login-module/login.service';
import ConsoleEditor from 'src/app/model/consoleEditor';
import CorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import SubmissaoGrupo from 'src/app/model/cscl/submissaoGrupo';
import ErroServidor from 'src/app/model/errors/erroServidor';
import PontuacaoQuestaoProgramacao from 'src/app/model/gamification/pontuacaoQuestaoProgramacao';
import { ModoExecucao } from 'src/app/model/juiz/enum/modoExecucao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import Submissao from 'src/app/model/submissao';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css'],
})
export class IdeComponent {

  @Input()
  questaoColaborativa;
  @Input()
  questaoCorrecao;
  @Input()
  grupo;
  @Input()
  submissao;
  @Input()
  atividadeGrupo;
  @Input()
  questao?;
  @Input()
  assunto?;
  @Input()
  modoExecucao;

  @Input()
  isMudancaEditorPermitida;


  modoVisualizacao;
  traceExecucao;
  usuario;
  consoleEditor: ConsoleEditor;
  processandoSubmissao;
  editorCodigo;

  @Output()
  onEditorError;

  constructor(
    private login: LoginService,
    public dialogService: DialogService
  ) {
    this.usuario = this.login.getUsuarioLogado();
    this.processandoSubmissao = false;
    this.consoleEditor = new ConsoleEditor();
    this.onEditorError = new EventEmitter();
    this.modoVisualizacao = false;
  }

  voltarParaModoExecucao() {
    this.modoVisualizacao = false;
  }

  onEditorMudancaExecucacao(modoExecucao){
    this.modoExecucao = modoExecucao;
  }


  /**
   * ngOnChanges é usado pelos child-components para receberem atualização da submissão. No entanto, seu comportamento (disparo de notificações de mudança) não funciona quando apenas um atributo do objeto é alterado.
   * Este método força uma clonagem do objeto, fazendo com que o ngOnChanges detecte que é um novo objeto e assim realize a atualização.
   * @param submissao
   */
  prepararSubmissao(submissao) {
    if (submissao != undefined) {
      let _submissaoClone = new Submissao(
        submissao.pk(),
        submissao.codigo,
        submissao.estudante,
        submissao.assunto,
        submissao.questao
      );
      _submissaoClone['estudanteId'] = submissao.estudanteId;
      _submissaoClone['assuntoId'] = submissao.assuntoId;
      _submissaoClone.data = submissao.data;
      _submissaoClone.erro = submissao.erro;
      _submissaoClone.resultadosTestsCases = submissao.resultadosTestsCases;
      _submissaoClone.saida = submissao.saida;
      return _submissaoClone;
    }

    return null;
  }

  
  onEditorReady(editor) {
    this.editorCodigo = editor;
  }

  erroEditor(submissao) {
    this.submissao = this.prepararSubmissao(submissao);
    this.consoleEditor.erroServidor = null;
    this.consoleEditor.submissao = this.submissao;

    

    this.onEditorError.emit(this.submissao);
  }

  onEditorSubmit(submissao) {
    this.submissao = this.prepararSubmissao(submissao);
    this.consoleEditor.erroServidor = null;
    this.consoleEditor.submissao = this.submissao;
   
  }

  onServidorError(erroServidor) {
    let erro = ErroServidor.construir(erroServidor);
    this.consoleEditor.erroServidor = erro;
  }

  onVisualization(visualizacao) {
    this.modoVisualizacao = visualizacao.modoVisualizacao;
    this.traceExecucao = visualizacao.trace;
  }
}
