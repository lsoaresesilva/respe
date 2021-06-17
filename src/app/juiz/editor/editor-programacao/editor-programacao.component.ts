import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  AfterViewInit,
  OnChanges,
  ViewChild,
  ComponentFactoryResolver,
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
import RespostaQuestaoCorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { VisualizacaoRespostasQuestoes } from 'src/app/model/visualizacaoRespostasQuestoes';
import { ModoExecucao } from 'src/app/model/juiz/enum/modoExecucao';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';
import { EditorTrintadoisbitsComponent } from '../editor-trintadoisbits/editor-trintadoisbits.component';
import { EditorPadraoComponent } from '../editor-padrao/editor-padrao.component';
import ParseAlgoritmo from 'src/app/model/errors/analise-pre-compilacao/parseAlgoritmo';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { Groups } from 'src/app/model/experimento/groups';
import Postagem from 'src/app/model/cscl/postagem';

/**
 * Executa um javascript ide.js para acoplar o editor VStudio.
 */
// declare var editor: any;
declare var monaco: any;
declare var editorProgramacao: any;

declare function iniciarEditorColaborativo(id): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css'],
  providers: [EscapeHtmlPipe],
})
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges, OnInit {
  URL = environment.URL;

  processandoSubmissao;
  processandoVisualizacao;

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
  isMudancaEditorPermitida;
  @Input()
  modoVisualizacao;
  @Input()
  questaoCorrecao;
  @Input()
  questaoColaborativa;

  /*CSCL*/

  @Input()
  atividadeGrupo;
  @Input()
  grupo;

  statusBtnEnvioAtividadeGrupo;
  usuario;
  salvamentoEdicoes;

  apresentarVisualizacao;
  displayPedidoAjuda: boolean;

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
  @Output()
  onEditorMudancaExecucao: EventEmitter<any>;

  document; // Armazena as edições colaborativas realizadas no editor.
  posicaoCursor;
  isConectado; // Armazena o status do editor em relação aos sockets de CSCL

  isEditorPronto;
  isSubmissaofinalizada;

  erroAtivo;

  iconModoEditor;

  constructor(
    private http: HttpClient,
    public login: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public chat: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public dialogService: DialogService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private monitor: MonitorService
  ) {
    this.apresentarVisualizacao = true;
    this.onEditorMudancaExecucao = new EventEmitter();
    this.onVisualization = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onError = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.onEditorReady = new EventEmitter();
    this.processandoSubmissao = false;
    this.processandoVisualizacao = false;
    this.usuario = this.login.getUsuarioLogado();
    editorProgramacao = null;
    this.iconModoEditor =
      parseInt(this.modoExecucao) == ModoExecucao.execucao32bits ? 'pi pi-pencil' : 'pi pi-table';

    /**
     * TODO: verificar se já foi feita a submissão de atividade em grupo, se sim inicia como true.
     */

    this.statusBtnEnvioAtividadeGrupo = false;
    this.isConectado = false;
    this.modoVisualizacao = false;
    this.items = [];
    this.isEditorPronto = false;
    this.isSubmissaofinalizada = false;
    this.modoVisualizacao = false;
  }

  ngOnInit(): void {
    this.posicaoCursor = { column: 1, lineNumber: 1 };
  }

  /**
   * ngOnChanges é usado pelos child-components para receberem atualização da submissão. No entanto, seu comportamento (disparo de notificações de mudança) não funciona quando apenas um atributo do objeto é alterado.
   * Este método força uma clonagem do objeto, fazendo com que o ngOnChanges detecte que é um novo objeto e assim realize a atualização.
   * @param submissao
   */
  clonarSubmissao(submissao) {
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

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    /*  if(changes.submissao != null && changes.submissao.currentValue != null){
      
    } */

    if (this.submissao != null) {
      this.atualizarEditorComSubmissao();
    }

    if (this.questaoColaborativa != null && this.questaoColaborativa.isOpenEnded == true) {
      this.apresentarVisualizacao = false;
    }
  }

  mudancaEditor() {
    this.modoExecucao =
      this.modoExecucao == ModoExecucao.execucao32bits
        ? ModoExecucao.execucaoPadrao
        : ModoExecucao.execucao32bits;
    this.iconModoEditor =
      parseInt(this.modoExecucao) == ModoExecucao.execucao32bits ? 'pi pi-pencil' : 'pi pi-table';
    this.onEditorMudancaExecucao.emit(this.modoExecucao);
  }

  ngAfterViewInit(): void {
    //this.desenharBotaoModoEdicao();
    this.editorCodigo = Editor.getInstance();

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
  }

  visualizarResposta(questao) {
    if (this.submissao.isFinalizada()) {
      const ref = this.dialogService.open(ExibirSolucaoComponent, {
        header: 'Algoritmo com a solução do problema',
        width: '60%',
        data: {
          questao: questao,
        },
      });

      const pageTrack = new PageTrackRecord(
        null,
        'visualizacao-resposta-questao',
        this.login.getUsuarioLogado()
      );
      pageTrack.save().subscribe(() => {});
    } else {
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

          VisualizacaoRespostasQuestoes.getByEstudante(
            questao,
            this.login.getUsuarioLogado()
          ).subscribe((visualizou) => {
            if (visualizou == null) {
              new VisualizacaoRespostasQuestoes(null, this.login.getUsuarioLogado(), questao)
                .save()
                .subscribe();
            }
          });

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
  }

  /* visualizarRespostaOutrosEstudantes(questao) {
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
  } */

  atualizarEditorComSubmissao() {
    if (this._submissao != null) {
      this.isSubmissaofinalizada = this._submissao.isFinalizada();

      if (this.atividadeGrupo == null) {
        this.editorCodigo.codigo.next(this._submissao['codigo']);
      }
    }
  }

  iniciarChat() {
    if (this.atividadeGrupo != null && this.grupo.id != null) {
      
        this.chat.iniciar(this.grupo.id).subscribe((resposta) => {
          if (resposta) {
            this.chat.receberMensagens();
            this.isConectado = true;
          }
        });
      
    }
  }

  onContainerReady(event) {
    this.isEditorPronto = true;

    if (this.atividadeGrupo != null && this.grupo.id != null) {

      // Apresentará uma mensagem ao usuário sobre a resolução de problemas após 15 minutos.
      setTimeout(()=>{
        this.monitor.ajudarProblemSolving(this.usuario, 2);
      }, 900000);

      this.iniciarChat();
      iniciarEditorColaborativo(this.grupo.id);
    } else {
      this.atualizarEditorComSubmissao();
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
    Editor.getInstance().removerDecorations();

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

  pedirAjuda(){

    this.displayPedidoAjuda = true;
    

  
  }

  enviarPedidoAjuda(pedidoAjuda){
    if(pedidoAjuda.value !== ""){

      let mensagem = pedidoAjuda.value;
      mensagem += "<code>"+this.submissao.codigo+"</code>";

      let postagem = new Postagem(null, "Pedido de ajuda - "+this.questao.nomeCurto, mensagem, this.usuario, this.usuario.turma);
      postagem.save().subscribe(()=>{
        let track = new PageTrackRecord(null, "pedido-ajuda", this.usuario).save().subscribe(()=>{

        });
        this.displayPedidoAjuda = false;
        pedidoAjuda.value = "";
        this.messageService.add({
          severity: 'success',
          summary: 'Pedido enviado com sucesso',
          detail: 'Seus amigos foram informados da sua dúvida!',
        });
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Escreva a sua dúvida',
        detail: 'Você precisa detalhar a sua dúvida para que seus amigos possam ajudar.',
      });
    }
    
  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {
    this.editorCodigo.codigo.next(this.editorCodigo.instanciaMonaco.getValue());
    const submissao = new Submissao(
      null,
      this.editorCodigo.instanciaMonaco.getValue(),
      this.usuario,
      this.assunto,
      this.questao
    );
    return submissao;
  }

  visualizarDocumentacaoProjeto() {
    this.router.navigate([
      'geral/main',
      {
        outlets: {
          principal: [
            'visualizar-documentacao-projeto',
            this.atividadeGrupo.pk(),
            this.grupo.id,
            this.assunto.pk(),
            this.questaoColaborativa.id,
          ],
        },
      },
    ]);
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
    }else{
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
          submissaoGrupo.save().subscribe((subGrupo) => {
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

    
  }

  submissaoRealizada(submissao) {
    this.erroAtivo = null;
    this.processandoSubmissao = false;
    this.submissao = submissao;
    if (submissao.isFinalizada()) {
      if (this.usuario.grupoExperimento != Groups.control) {
        DiarioProgramacao.exibirDiario(
          this.login.getUsuarioLogado(),
          TipoDiarioProgramacao.reflexao
        ).subscribe((visibilidade) => {
          if (visibilidade) {
            this.dialogService.open(DiarioProgramacaoComponent, {
              data: { tipo: TipoDiarioProgramacao.reflexao },
              width: '600',
              height: '480',
            });
          }
        });
      }
    }

    if (this.atividadeGrupo != null) {
      this.submissao = submissao;
      this.submissao.save().subscribe(()=>{
        let submissaoGrupo = new SubmissaoGrupo(
          null,
          this.submissao,
          this.grupo,
          this.atividadeGrupo,
          false
        );
        submissaoGrupo.save().subscribe(() => {});
      })
      
    } else {
      if (this.questaoCorrecao == null) {
        submissao.save().subscribe((resposta) => {
          this.submissao = resposta;
        });
      } else {
        let correcaoAlgoritmo = new RespostaQuestaoCorrecaoAlgoritmo(
          null,
          submissao,
          this.usuario,
          this.assunto,
          this.questaoCorrecao
        );
        correcaoAlgoritmo.save().subscribe(() => {
          this.submissao = submissao;
        });
      }
    }

    this.onSubmit.emit(this.submissao);
  }

  inicioSubmissao() {
    this.processandoSubmissao = true;
  }

  erroServidor(data) {
    this.processandoSubmissao = false;
    this.onServidorError.emit(data);
  }

  erroSubmissao(data) {
    this.processandoSubmissao = false;
    this.submissao = data.submissao;
    if (data.erro.error != null && data.erro.error.mensagem != null) {
      this.submissao.processarErroServidor(data.erro.error.mensagem);
    } else if (data.erro != null) {
      if (!(data.erro instanceof HttpErrorResponse)) {
        this.submissao.processarErroServidor(data.erro);
      }
    }

    if (this.atividadeGrupo == null) {
      let parseError = new ParseAlgoritmo(this.submissao.linhasAlgoritmo());
      if (this.submissao.erro != null) {
        let erro = parseError.getHint(this.submissao.erro.traceback);
        if (erro.length > 0) {
          this.erroAtivo = erro[0];
        }

        this.monitor.monitorarErrosEstudante(this.questao, this.usuario, erro[0]);
      }
    }

    if (this.questaoCorrecao == null) {
      this.submissao.save().subscribe((resultado) => {
        this.onError.emit(this.submissao);
      });
    } else {
      let correcaoAlgoritmo = new RespostaQuestaoCorrecaoAlgoritmo(
        null,
        this.submissao,
        this.usuario,
        this.assunto,
        this.questaoCorrecao
      );
      correcaoAlgoritmo.save().subscribe(() => {
        this.onError.emit(this.submissao);
      });
    }
  }
}
