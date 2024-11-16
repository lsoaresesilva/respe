import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';
import RespostaQuestaoProgramacao from 'src/app/model/aprendizagem/questoes/respostaQuestaoProgramacao';
import ParseAlgoritmo from 'src/app/model/errors/analise-pre-compilacao/parseAlgoritmo';
import { AutoInstrucao } from 'src/app/model/srl/autoInstrucao';
import { InterpretadorPythonService } from '../editor/interpretador-python.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ExibirSolucaoComponent } from 'src/app/srl/monitoramento/exibir-solucao/exibir-solucao.component';
import Editor from 'src/app/model/editor';

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
  editorCodigo;
  displayPedidoAjuda = false;

  constructor(
    private route: ActivatedRoute,private router: Router,
    private interpretadorPython: InterpretadorPythonService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) {
    this.editorCodigo = Editor.getInstance();
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['questaoId'] != undefined) {

        QuestaoProgramacao.get(params['questaoId']).subscribe((questao) => {
          this.questao = questao as QuestaoProgramacao;
          RespostaQuestaoProgramacao.filtrarRecente(this.questao).subscribe((submissao) => { this.submissao = submissao; });
          

          
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

  async executar() {
    
    this.processandoSubmissao = true;

    if (this.submissao.validar()) {
      
      const erros = new ParseAlgoritmo(this.submissao.linhasAlgoritmo()).analisar().todosErros;
      if( erros == null){
       
        const json = this.submissao.objectToDocument();
        const resultado = await this.interpretadorPython.runPythonCodeAndCompare(
          this.submissao,
          this.questao
        );
        this.submissao.atualizarResultados(resultado);
        
        if (this.submissao.isFinalizada()) {

          /*  this.gamification.aumentarPontuacao(
             this.login.getUsuarioLogado(),
             this.questao,
             new PontuacaoQuestaoProgramacao()
           ); */
         }
   
         
      }else{
        this.submissao.erros = erros;
        
      }

      this.processandoSubmissao = false;
      
    } else {
     
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não é possível executar o código, pois ele está vazio.',
      });
    }
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

    this.editorCodigo = Editor.getInstance();

    let _this = this;

    

    setTimeout(function () {
      carregarIde(
        false,
        function () {
          _this.isEditorPronto = true;
        },
        _this,
        _this.carregarEditor,
        _this.editorCodigo.codigo
      );
    }, 500);
  }

  carregarEditor(instance, editor) {
    instance.editorCodigo.instanciaMonaco = editor;
    instance.onContainerReady.emit();

    instance.editorCodigo.instanciaMonaco.onKeyDown(function (e) {
      let linhaAtual = editor.getPosition().lineNumber;
      if(instance.erroAtivo != null){
        if(instance.erroAtivo.linha == linhaAtual){
          instance.removerDestaquesErro()
        }
      }

    }); 
  }

  removerDestaquesErro(){
    Editor.getInstance().removerDecorations();
    Editor.getInstance().removerDisposableHover();
  }

  destacarErro(){
    const erro = this.submissao.getPrimeiroErro();
    Editor.getInstance().criarHover(erro);
    setTimeout(() => {
      Editor.getInstance().destacarLinha(erro.linha, "linhaErro")
    }, 1000);
    
  }


}
