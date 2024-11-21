import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';
import RespostaQuestaoProgramacao, {STATUS_RESPOSTA_QUESTAO_PROGRAMACAO} from 'src/app/model/aprendizagem/questoes/respostaQuestaoProgramacao';
import { AutoInstrucao } from 'src/app/model/srl/autoInstrucao';
import { InterpretadorPythonService } from '../editor/interpretador-python.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ExibirSolucaoComponent } from 'src/app/srl/monitoramento/exibir-solucao/exibir-solucao.component';
import Editor from 'src/app/model/editor';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { MensagemErroFactory } from 'src/app/model/errors/analise-pre-compilacao/parseAlgoritmo';


declare function carregarIde(
  readOnly,
  callback,
  instance,
  callbackOnEditorLoad,
  codigo
): any;



@Component({
  selector: 'app-editor-programacao-respe',
  templateUrl: './editor-programacao-respe.component.html',
  styleUrls: ['./editor-programacao-respe.component.css']
})
export class EditorProgramacaoRespeComponent implements OnInit {

  questao;
  assunto;
  submissao:RespostaQuestaoProgramacao;
  processandoSubmissao = false;
  isEditorPronto = false;
  editorCodigo: Editor;
  displayPedidoAjuda = false;

  @Output()
  onContainerReady;
  STATUS_RESPOSTA_QUESTAO_PROGRAMACAO: STATUS_RESPOSTA_QUESTAO_PROGRAMACAO;

  constructor(
    private route: ActivatedRoute,private router: Router,
    private interpretadorPython: InterpretadorPythonService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private sanitizer: DomSanitizer
  ) {
    
    this.onContainerReady = new EventEmitter();
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['questaoId'] != undefined) {

        QuestaoProgramacao.get(params['questaoId']).subscribe((questao) => {
          this.questao = questao as QuestaoProgramacao;
          this.editorCodigo = new Editor(this.interpretadorPython, this.questao);
          
          

          
        });
      }
    });
  }

  exibirAutoInstrucao(){
    return AutoInstrucao.exibirAutoInstrucao(this.questao);
  }

  visualizarPlanejamento() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['srl', 'self-instruction-editor', this.assunto.pk, this.questao.pk] } },
    ]);
  }

  ngOnChanges(): void {
    if(this.submissao.erros != null){
      this.destacarErro();
    }
  }

  getStatusExecucaoSubmissao(){
    return STATUS_RESPOSTA_QUESTAO_PROGRAMACAO;
  }

  async executar() {
    
    
    if (this.submissao.validar()) {
      this.processandoSubmissao = true;
      this.submissao = await this.editorCodigo.executar();
      this.submissao.save().subscribe((submissao) => {
        
      });
    }else {
      
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não é possível executar o código, pois ele está vazio.',
      });
    }

    this.processandoSubmissao = false;
  }

  visualizarResposta() {
    if (this.submissao.isFinalizada()) {
      const ref = this.dialogService.open(ExibirSolucaoComponent, {
        header: 'Algoritmo com a solução do problema',
        width: '60%',
        data: {
          questao: this.questao,
        },
      });

      /* const pageTrack = new PageTrackRecord(
        null,
        'visualizacao-resposta-questao',
        this.login.getUsuarioLogado()
      );
      pageTrack.save().subscribe(() => {}); */
    } else {
      this.confirmationService.confirm({
        message:
          'Se você visualizar a resposta dessa questão não ganhará pontos ao respondê-la. Tem certeza que deseja visualizar?',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: async () => {
          /* const usuario = this.login.getUsuarioLogado();
          const pageTrack = new PageTrackRecord(
            null,
            'visualizacao-resposta-questao',
            usuario
          );
          pageTrack.save().subscribe(() => {});
          
          VisualizacaoRespostasQuestoes.getByEstudante(
            questao,
            usuario
          ).subscribe((visualizou) => {
            if (visualizou == null) {
              new VisualizacaoRespostasQuestoes(null, usuario, questao)
                .save()
                .subscribe();
            }
          }); */

          const ref = this.dialogService.open(ExibirSolucaoComponent, {
            header: 'Algoritmo com a solução do problema',
            width: '60%',
            data: {
              questao: this.questao,
            },
          });

          ref.onClose.subscribe(() => {
            this.confirmationService.close();
          });
        },
      });
    }
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

  onEditorCarregado(){
    this.editorCodigo.codigoAtual = this.questao != null && this.questao.algoritmoInicial != null ? this.questao.algoritmoInicial : '';
    RespostaQuestaoProgramacao.filtrarRecente(this.questao).subscribe(async (submissao) => { 
      this.submissao = submissao; 
      this.editorCodigo.codigoAtual = this.submissao != null ? this.submissao.codigo : '';
      const submissaoExecutada = await this.editorCodigo.executar();
      this.submissao.resultadosTestsCases = submissaoExecutada.resultadosTestsCases;
    });
  }

  getMensagemErro(){
    const mensagemErro = this.submissao.erro != null ? this.submissao.erro.mensagem : '';//MensagemErroFactory.construir(this.submissao.erro).getMensagemAmigavel();
    let mensagem = this.sanitizer.bypassSecurityTrustHtml(mensagemErro);
    return mensagem;
  }

  removerDestaquesErro(){
    Editor.getInstance().removerDecorations();
    Editor.getInstance().removerDisposableHover();
  }

  destacarErro(){
    const erro = this.submissao.erros.getPrimeiroErro();
    Editor.getInstance().criarHover(erro);
    setTimeout(() => {
      Editor.getInstance().destacarLinha(erro.linha, "linhaErro")
    }, 1000);
    
  }

  destacarDiferencasSaidas(testCase, saidaReal, pos) {
    let text = '';
    let saidaEsperada = testCase.saida;
    let oldText = saidaEsperada;
    if (!Array.isArray(saidaEsperada)) {
      text += "<span style='font-weight:bold'>Saída real: </span>";
      saidaReal.split('').forEach(function (val, i) {
        if (val != oldText.charAt(i)) text += "<span class='highlight'>" + val + '</span>';
        else text += val;
      });
      text +=
        "<br><span style='font-weight:bold'>Saída esperada: </span><span>" +
        saidaEsperada +
        '</span>';
    } else {
      text += "<span style='font-weight:bold'>Saída real: </span>";

      saidaReal.split('').forEach(function (val, i) {
        if (oldText[pos] != null) {
          if (val != oldText[pos].charAt(i)) {
            text += "<span class='highlight'>" + val + '</span>';
          } else {
            text += val;
          }
        } else {
          text += val;
        }
      });
      let valorSaidaEsperada = saidaEsperada[pos] != null ? saidaEsperada[pos] : '';
      text +=
        "<br><span style='font-weight:bold'>Saída esperada: </span><span>" +
        valorSaidaEsperada +
        '</span>';
    }

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }



}
