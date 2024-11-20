import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ChangeDetectorRef,
  ApplicationRef,
  AfterViewInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import Editor from 'src/app/model/editor';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import PedidoAjuda from 'src/app/model/pedidoAjuda';
import { Util } from 'src/app/model/util';
import { LoginService } from '../../../login-module/login.service';

import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';
import { Observable } from 'rxjs';
import Usuario from 'src/app/model/usuario';
import PontuacaoQuestaoProgramacao from 'src/app/model/gamification/pontuacaoQuestaoProgramacao';
import Gamification from 'src/app/model/gamification/gamification';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { ConfirmationService } from 'primeng/api';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import RespostaQuestaoCorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import { DialogService } from 'primeng/dynamicdialog';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { ModoExecucao } from 'src/app/model/juiz/enum/modoExecucao';
import { Groups } from 'src/app/model/experimento/groups';
import { ChatbotService } from 'src/app/chatbot/chatbot.service';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { AutoInstrucao } from '../../../model/srl/autoInstrucao';
import RespostaQuestaoProgramacao from 'src/app/model/aprendizagem/questoes/respostaQuestaoProgramacao';


@Component({
  selector: 'responder-questao-programacao',
  templateUrl: './responder-questao-programacao.component.html',
  styleUrls: ['./responder-questao-programacao.component.css'],
})
export class ResponderQuestaoProgramacao implements OnInit, AfterViewInit {
  [x: string]: any;

  assunto;
  errosEstudante;

  pausaIde;
  questao?: QuestaoProgramacao;
  statusExecucao;
  submissao: RespostaQuestaoProgramacao;
  dialogPedirAjuda: boolean = false;
  duvida: string = '';

  observableQuestao: Observable<any>;

  usuario: Usuario;

  /* CSCL */
  atividadeGrupo: AtividadeGrupo;
  grupo: Grupo;
  questaoColaborativa;
  isMudancaEditorPermitida;
  apresentarTestesCases;
  questaoCorrecao;

  modoExecucao;
  modoVisualizacao;

  constructor(
    private route: ActivatedRoute,
    public login: LoginService,
    private router: Router,
    private apresentacao: ApresentacaoService,
    public dialogService: DialogService,
    private chatbotService: ChatbotService,
    ) {
    this.pausaIde = true;
    this.statusExecucao = '';

    this.observableQuestao = new Observable((observer) => {
      observer.next();
      observer.complete();
    });

    
    this.usuario = this.login.getUsuarioLogado();
    this.apresentarTestesCases = true;
    this.isMudancaEditorPermitida = true;
    this.modoExecucao = ModoExecucao.execucao32bits;
    /* if(this.usuario.grupoExperimento == Groups.control){
      this.modoExecucao = ModoExecucao.execucao32bitsPadrao;
    }else{
      this.modoExecucao = ModoExecucao.execucao32bits;
    } */

    this.router.events.subscribe(
      event => {
        this.submissao = null;
      });

    //Editor.getInstance().codigo.next('');
  }

  async ngAfterViewInit(): Promise<void> {
    
    let _this = this;
    setTimeout(function () {
      _this.route.params.subscribe((params) => {});
    }, 3000);
  }

  /**
   * ngOnChanges é usado pelos child-components para receberem atualização da submissão. No entanto, seu comportamento (disparo de notificações de mudança) não funciona quando apenas um atributo do objeto é alterado.
   * Este método força uma clonagem do objeto, fazendo com que o ngOnChanges detecte que é um novo objeto e assim realize a atualização.
   * @param submissao
   */
  prepararSubmissao(submissao) {
    if (submissao != undefined) {
      let _submissaoClone = new RespostaQuestaoProgramacao(
        submissao.pk(),
        submissao.codigo,
        submissao.estudante,
        submissao.assunto,
        submissao.questao
      );
      _submissaoClone['estudanteId'] = submissao.estudanteId;
      _submissaoClone['assuntoId'] = submissao.assuntoId;
      _submissaoClone.data = submissao.data;
      _submissaoClone.erros = submissao.erros;
      _submissaoClone.resultadosTestsCases = submissao.resultadosTestsCases;
      _submissaoClone.saida = submissao.saida;
      return _submissaoClone;
    }

    return null;
  }

  visualizarPlanejamento() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['srl', 'self-instruction-editor', this.assunto.pk, this.questao.pk] } },
    ]);
  }

  exibirAutoInstrucao(){
    return AutoInstrucao.exibirAutoInstrucao(this.questao);
  }

  onEditorError(submissao) {
    this.submissao = submissao;
    this.atualizarCardErros();
  }

  onEditorSubmit(submissao) {
    /* this.submissao.save().subscribe(
      (resultado) => {
      
    }); */
  }

  ngOnInit() {



    if (this.usuario == null) {
      throw new Error('Não é possível executar o código, pois você não está logado.'); // TODO: mudar para o message
    }

    this.route.params.subscribe((params) => {
      // Atividade em grupo

      if (params['questaoCorrecaoId'] != null) {
        // Atividade de correção
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto as Assunto;

          if (assunto['questoesCorrecao'] != undefined && assunto['questoesCorrecao'].length > 0) {
            assunto['questoesCorrecao'].forEach((questaoCorrecao) => {
              if (questaoCorrecao.pk == params['questaoCorrecaoId']) {
                this.questaoCorrecao = questaoCorrecao;
                this.questao = questaoCorrecao.questao;

                RespostaQuestaoCorrecaoAlgoritmo.getRecentePorQuestao(
                  this.questaoCorrecao,
                  this.usuario
                ).subscribe((correcao: RespostaQuestaoCorrecaoAlgoritmo) => {
                  if (correcao != null) {
                    this.correcao = correcao;
                    this.submissao = RespostaQuestaoProgramacao.dataToObject(correcao.submissao);
                  } else {
                    this.questaoCorrecao
                      .getSubmissaoComErro(this.usuario)
                      .subscribe((submissaoErro) => {
                        this.submissao = submissaoErro;
                      });
                  }
                });
              }
            });
          }
        });
      } else {
        if (params['questaoId'] != undefined) {

          QuestaoProgramacao.get(params['questaoId']).subscribe((questao) => {
            this.questao = questao as QuestaoProgramacao;
            RespostaQuestaoProgramacao.filtrarRecente(this.questao).subscribe((submissao) => { this.submissao = submissao; });
            

            
          });
        }

          /* Assunto.get(params['assuntoId']).subscribe((assunto) => {
            this.assunto = assunto as Assunto;

            if (
              assunto['questoesProgramacao'] != undefined &&
              assunto['questoesProgramacao'].length > 0
            ) {
              assunto['questoesProgramacao'].forEach((questao) => {
                if (questao.pk == params['questaoId']) {
                  this.questao = questao;

                  if (this.usuario != null) {
                    // --------- Casos de Teste e Resposta para mandar ao RASA ------
                    let casosTeste = this.questao.testsCases[3];
                    if (this.questao.testsCases.length > 2) {
                      this.questao.testsCases.splice(3, 1);
                    }
                    let resposta = this.questao.solucao.codigo;
                    let perguntaDados = [this.questao.sequencia, this.questao.nomeCurto, this.questao.pk];
                    this.chatbotService.sendMessage({ teste: casosTeste, resposta: [resposta, perguntaDados]});
                    // --------------------------------------------------------------

                    new RespostaQuestaoProgramacao(getRecentePorQuestao(this.questao, this.usuario).subscribe(
                      (submissao: RespostaQuestaoProgramacao) => {
                        if (submissao != null) {
                          this.submissao = this.prepararSubmissao(submissao);
                        }

                        this.atualizarCardErros();
                      }
                    );
                  }
                }
              });

              if (this.questao == undefined) {
                throw new Error('Não é possível iniciar o editor sem uma questão.');
              } else {
                // this.editorCodigo = Editor.getInstance();
              }
            }
          });
        } else {
          throw new Error('Não é possível iniciar o editor sem uma questão.');
        } */
      }
    });

    //this.salvarAutomaticamente(); # desabilitado temporariamente por questões de performance.
  }

  atualizarCardErros() {
    RespostaQuestaoProgramacao.getPorQuestao(this.questao, this.usuario).subscribe((submissoes) => {
      const erros = RespostaQuestaoProgramacao.getAllErros(submissoes);
      this.errosEstudante = erros;
    });
  }

  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> ";
    if (!status) this.statusExecucao = textoStatus + "<span class='statusErro'>Erro</span>";
    else this.statusExecucao = textoStatus + "<span class='statusSucesso'>Sucesso</span>";
  }

  pedirAjuda() {
    this.dialogPedirAjuda = true;
  }

  enviarPedidoDeAjuda() {
    let pedidoAjuda = new PedidoAjuda(null, this.submissao, this.duvida, []);

    if (pedidoAjuda.validar()) {
      pedidoAjuda.save().subscribe(
        (resultado) => {
          // TODO: usar o message service para mensagem de sucesso
        },
        (err) => {
          // TODO: usar o message service para mensagem de erro
        }
      );
    } else {
      alert('Preencha todos os campos se quiser realizar salvar o planejamento'); // TODO: usar o message service
    }
  }

  /* listarSubmissao() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['estudantes-questao', this.assunto.id, this.questao.pk] } },
    ]);
  } */

  /*enviarErroEditor() {
    let submissao = this.prepararSubmissao();
    submissao.save().subscribe(submissao => {
      let errorEditor = new ErroEditor(null, submissao.pk());
      errorEditor.save().subscribe(erro => {
        alert("Erro notificado com sucesso. Obrigado!");
      });
    });

  }*/
}
