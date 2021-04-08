import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import Submissao from 'src/app/model/submissao';
import Editor from 'src/app/model/editor';
import { LoginService } from 'src/app/login-module/login.service';

import { catchError, retry, switchMap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/cscl/chat.service';
import { Assunto } from 'src/app/model/assunto';
import Edicao from 'src/app/model/cscl/edicao';
import Algoritmo from 'src/app/model/algoritmo';
import SubmissaoGrupo from 'src/app/model/cscl/submissaoGrupo';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import HistoricoEdicoes from 'src/app/model/cscl/historicoEdicoes';
import TraceVisualizacao from 'src/app/model/visualizacao/traceVisualizacao';
import { DialogService } from 'primeng/dynamicdialog';
import { ExibirSolucaoComponent } from 'src/app/srl/monitoramento/exibir-solucao/exibir-solucao.component';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import CorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';

/**
 * Executa um javascript ide.js para acoplar o editor VStudio.
 */
// declare var editor: any;
declare var monaco: any;
declare var editorProgramacao: any;
declare function carregarIde(
  readOnly,
  callback,
  instance,
  callbackOnEditorLoad,
  codigo,
  isAtividadeGrupo
): any;

declare function iniciarEditorColaborativo(id): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css'],
})
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges, OnInit {
  URL = environment.URL;

  processandoSubmissao;
  processandoVisualizacao;

  editor; // instância do Mônaco Editor. Carregado por meio do arquivo ide.js

  

  @Input()
  console;
  @Input()
  questao;
  @Input()
  assunto;
  @Input()
  liteMode; // define que o editor executará em um modo de aparência menor.
  @Input()
  modoExecucao;
  @Input()
  modoVisualizacao;
  @Input()
  questaoCorrecao;

  /*CSCL*/

  @Input()
  atividadeGrupo;
  @Input()
  grupo;

  statusBtnEnvioAtividadeGrupo;

  usuario;
  salvamentoEdicoes;

  @Input() set submissao(value) {
    this._submissao = value;
    if (this._submissao != null && this._submissao.isFinalizada != null) {
      this.isSubmissaofinalizada = this._submissao.isFinalizada();
    }

    this.atualizarEditorComSubmissao();
  }

  get submissao() {
    return this._submissao;
  }

  _submissao;
  editorCodigo?: Editor;

  items; // Botões da visualização de algoritmos

  
  @Output()
  onSubmit: EventEmitter<any>;
  @Output()
  onServidorError: EventEmitter<any>;
  @Output()
  onError: EventEmitter<any>;
  
  @Output()
  onVisualization: EventEmitter<any>;
  @Output()
  onEditorReady: EventEmitter<any>;

  document; // Armazena as edições colaborativas realizadas no editor.
  posicaoCursor;
  isConectado; // Armazena o status do editor em relação aos sockets de CSCL

  isEditorPronto;
  isSubmissaofinalizada;

  constructor(
    private http: HttpClient,
    public login: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public chat: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    
    
    this.onVisualization = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onError = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.onEditorReady = new EventEmitter();
    this.processandoSubmissao = false;
    this.processandoVisualizacao = false;
    this.usuario = this.login.getUsuarioLogado();
    editorProgramacao = null;

    /**
     * TODO: verificar se já foi feita a submissão de atividade em grupo, se sim inicia como true.
     */

    this.statusBtnEnvioAtividadeGrupo = false;
    this.isConectado = false;
    this.modoVisualizacao = false;
    this.items = [];
    this.isEditorPronto = false;
    this.isSubmissaofinalizada = false;
  }

  ngOnInit(): void {
    this.posicaoCursor = { column: 1, lineNumber: 1 };
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    this.editorCodigo = Editor.getInstance();
    this.editorCodigo.codigo.subscribe((codigo)=>{
      if(this.editor != null){
        this.editor.getModel().setValue(codigo);
      }
      
    }) // Houve mudança no código
    if (
      this.questao != null &&
      this.questao.algoritmoInicial !== null &&
      this.questao.algoritmoInicial !== '' &&
      Array.isArray(this.questao.algoritmoInicial)
    ) {
      this.editorCodigo.codigo.next(this.questao.algoritmoInicial.join('\n'));
    } else {
      this.editorCodigo.codigo.next('');
    }

    let _this = this;

    if (
      this.questao != null &&
      this.questao.testsCases != null &&
      Array.isArray(this.questao.testsCases)
    ) {
      let i = 0;
      this.questao.testsCases.forEach((testCase) => {
        i++;
        this.items.push({
          label: 'Entrada ' + i,
          command: () => {
            this.visualizar(testCase);
          },
        });
      });
    }

    let isAtividadeGrupo = false;
    if (this.atividadeGrupo != null) {
      isAtividadeGrupo = true;
    }

    setTimeout(function () {
      carregarIde(
        false,
        function () {
          _this.isEditorPronto = true;
        },
        _this,
        _this.carregarEditor,
        _this.editorCodigo.codigo,
        isAtividadeGrupo
      );
    }, 500);
  }

  visualizarResposta(questao) {
    this.confirmationService.confirm({
      message:
        'Se você visualizar a resposta dessa questão não ganhará pontos ao respondê-la. Tem certeza que deseja visualizar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const pageTrack = new PageTrackRecord(
          null,
          'visualizacao-resposta-questao',
          this.login.getUsuarioLogado()
        );
        pageTrack.save().subscribe(() => {});
        const ref = this.dialogService.open(ExibirSolucaoComponent, {
          header: 'Algoritmo com a solução do problema',
          width: '60%',
          data: {
            questao: questao,
          },
        });

        ref.onClose.subscribe(() => {
          this.confirmationService.close();
        });
      },
    });
  }

  visualizarRespostaOutrosEstudantes(questao) {
    if (this.isSubmissaofinalizada) {
      const pageTrack = new PageTrackRecord(
        null,
        'visualizacao-resposta-questao',
        this.login.getUsuarioLogado()
      );
      pageTrack.save().subscribe(() => {});
      const ref = this.dialogService.open(ExibirSolucaoComponent, {
        header: 'Escolha uma solução',
        width: '60%',
        data: {
          questao: questao,
        },
      });
    }
  }

  atualizarEditorComSubmissao() {
    if (this._submissao != null) {
      this.isSubmissaofinalizada = this._submissao.isFinalizada();

      if (this.editor != null && this.atividadeGrupo == null) {
        this.editorCodigo.codigo.next(this._submissao['codigo']);
        this.editor.getModel().setValue(this.editorCodigo.codigo.value);
        //atualizarDecorations();
      }
    }
  }

  carregarEditor(editorProgramacaoComponentInstance, editor) {
    editorProgramacaoComponentInstance.editor = editor;
    editorProgramacaoComponentInstance.onEditorReady.emit(editor);

    if (
      editorProgramacaoComponentInstance.atividadeGrupo != null &&
      editorProgramacaoComponentInstance.grupo.id != null
    ) {
      editorProgramacaoComponentInstance.chat
        .iniciar(editorProgramacaoComponentInstance.grupo.id)
        .subscribe((resposta) => {
          if (resposta) {
            editorProgramacaoComponentInstance.chat.receberMensagens();
            editorProgramacaoComponentInstance.isConectado = true;
          }
        });

      iniciarEditorColaborativo(editorProgramacaoComponentInstance.grupo.id);
    } else {
      editorProgramacaoComponentInstance.atualizarEditorComSubmissao();
    }
  }

  visualizarExecucacao(modoVisualizacao, trace) {
    this.onVisualization.emit({
      modoVisualizacao: modoVisualizacao,
      trace: trace,
    });
  }

  voltarParaModoExecucao() {
    this.onVisualization.emit(false);
  }

  suspenderVisualizacao() {
    if (this.editor != null) {
      /* let decorations = this.editor.getModel().getAllDecorations();

      if(Array.isArray(decorations)){
        decorations.forEach(d=>{
          this.editor.deltaDecorations(d, []);
        })
      } */

      Editor.getInstance().decorations = this.editor.deltaDecorations(
        Editor.getInstance().decorations,
        []
      );
    }

    this.onVisualization.emit({
      modoVisualizacao: false,
      trace: null,
    });
  }

  visualizar(testCase) {
    const submissao = this.prepararSubmissao();
    
    const pageTrack = new PageTrackRecord(
      null,
      'visualizacao-algoritmo',
      this.login.getUsuarioLogado()
    );
    pageTrack.save().subscribe(() => {});
    if (submissao.validar()) {
      this.processandoVisualizacao = true;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      // TODO: definir um timedout
      this.submissao = submissao;
      const json = this.submissao.construirJsonVisualizacao(this.questao, testCase);

      this.http.post(this.URL + 'codigo/', json, httpOptions).subscribe(
        (resposta) => {
          if (TraceVisualizacao.possuiErro(String(resposta))) {
            this.processandoVisualizacao = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Não é possível visualizar a execução',
              detail:
                'O seu algoritmo possui algum erro e por isso não é possível visualizar sua execução.',
            });

            submissao.processarErroServidor(resposta);

            //this.onError.emit(this._submissao);
            
          } else {
            this.processandoVisualizacao = false;
            const padrao = /(.*?){.*"code"/gs;
            let re = new RegExp(padrao);
            let x = re.exec(String(resposta));
            if (Array.isArray(x) && x.length > 1) {
              const respostaParser: string = String(resposta).replace(x[1], '');

              this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
            }
          }
        },
        (err) => {
          this.processandoVisualizacao = false;
          // this.prepararMensagemExceptionHttp(err);
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não é possível executar o código, pois ele está vazio.',
      });
    }
  }

  

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {
    this.editorCodigo.codigo.next(this.editor.getValue());
    const submissao = new Submissao(
      null,
      this.editor.getValue(),
      this.usuario,
      this.assunto,
      this.questao
    );
    return submissao;
  }

  enviarRespostaAtividadeGrupo() {
    if (this.atividadeGrupo == null && this.atividadeGrupo.pk() == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha ao enviar atividade',
        detail: 'Isso não parece ser uma atividade em grupo.',
      });
    }

    if (this.submissao == null || this.submissao.pk() == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha ao enviar atividade',
        detail:
          'Antes de entregar a atividade é preciso executar o seu código. Após isso tente novamente entregar a atividade',
      });
    }

    this.confirmationService.confirm({
      message: 'Somente é possível realizar uma entrega. Tem certeza?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let submissaoGrupo = new SubmissaoGrupo(
          null,
          this.submissao,
          this.grupo,
          this.atividadeGrupo,
          true
        );
        submissaoGrupo.save().subscribe(() => {
          this.statusBtnEnvioAtividadeGrupo = true;

          /**
           * TODO: desabilitar o botão também para os outros usuários.
           */

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Atividade entregue com sucesso.',
          });
        });
      },
    });
  }

  submissaoRealizada(submissao){
    this.processandoSubmissao = false;
    this.submissao = submissao;
    if(submissao.isFinalizada()){
      DiarioProgramacao.exibirDiario(this.login.getUsuarioLogado(), TipoDiarioProgramacao.reflexao).subscribe(visibilidade=>{
        if(visibilidade){
          this.dialogService.open(DiarioProgramacaoComponent, {
            data: { tipo: TipoDiarioProgramacao.reflexao },
            width:'600',
            height:'480'
          });
        }
      });
      
    }

    if (this.atividadeGrupo != null) {
      let submissaoGrupo = new SubmissaoGrupo(
        null,
        submissao,
        this.grupo,
        this.atividadeGrupo,
        false
      );
      submissaoGrupo.save().subscribe(() => {});
      
    }else{
      if(this.questaoCorrecao == null){
        submissao.save().subscribe((resposta)=>{
          this.submissao = resposta;
          this.onSubmit.emit(this.submissao);
        });
      }else{
        let correcaoAlgoritmo = new CorrecaoAlgoritmo(null, submissao, this.usuario, this.assunto, this.questaoCorrecao);
        correcaoAlgoritmo.save().subscribe(()=>{
          this.submissao = submissao;
          this.onSubmit.emit(this.submissao);
        });
      }
      
    }
    
  }

  inicioSubmissao(){
    this.processandoSubmissao = true;
  }

  erroSubmissao(data){
    this.processandoSubmissao = false;
    this.submissao = data.submissao;
    if(data.erro.error != null && data.erro.error.mensagem != null){
      this.submissao.processarErroServidor(data.erro.error.mensagem);
    }else if(data.erro != null){
      this.submissao.processarErroServidor(data.erro);
    }
    
    
    if(this.questaoCorrecao == null){
      this.submissao.save().subscribe((resultado) => {
        this.onError.emit(this.submissao);
      });
    }else{
      let correcaoAlgoritmo = new CorrecaoAlgoritmo(null, this.submissao, this.usuario, this.assunto, this.questaoCorrecao);
      correcaoAlgoritmo.save().subscribe(()=>{
        this.onError.emit(this.submissao);
      });
    }

    
  }
}
