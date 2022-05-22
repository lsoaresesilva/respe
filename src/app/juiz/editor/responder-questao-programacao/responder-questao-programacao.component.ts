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

import ErroEditor from 'src/app/model/erroEditor';

import { FormBuilder } from '@angular/forms';
import Submissao from 'src/app/model/submissao';
import ConsoleEditor from 'src/app/model/consoleEditor';
import ErroServidor from 'src/app/model/errors/erroServidor';
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
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import { Assunto } from 'src/app/model/questoes/assunto';


@Component({
  selector: 'responder-questao-programacao',
  templateUrl: './responder-questao-programacao.component.html',
  styleUrls: ['./responder-questao-programacao.component.css'],
})
export class ResponderQuestaoProgramacao implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  [x: string]: any;

  assunto;
  errosEstudante;

  pausaIde;
  questao?: QuestaoProgramacao;
  statusExecucao;
  submissao: Submissao;
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
    if(this.usuario.grupoExperimento == Groups.control){
      this.modoExecucao = ModoExecucao.execucao32bitsPadrao;
    }else{
      this.modoExecucao = ModoExecucao.execucao32bits;
    }

    this.router.events.subscribe(
      event => {
        this.submissao = null;
      });

    Editor.getInstance().codigo.next('');
  }

  ngOnDestroy(): void {
    let x = 2;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('algo mudou');
  }

  ngAfterViewInit(): void {
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

  visualizarPlanejamento() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['self-instruction-editor', this.assunto.pk(), this.questao.id] } },
    ]);
  }

  onEditorError(submissao) {
    this.submissao = submissao;
    this.atualizarCardErros();
  }

  onEditorSubmit(submissao) {
    this.submissao = submissao;
  }

  ngOnInit() {



    if (this.usuario == null) {
      throw new Error('Não é possível executar o código, pois você não está logado.'); // TODO: mudar para o message
    }

    this.route.params.subscribe((params) => {
      // Atividade em grupo

      if (
        params['atividadeGrupoId'] != null &&
        params['grupoId'] != undefined &&
        params['assuntoId'] != undefined &&
        params['questaoId'] != undefined
      ) {



        AtividadeGrupo.get(params['atividadeGrupoId']).subscribe((atividadeGrupo) => {
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
          this.grupo = this.atividadeGrupo.getGrupo(params['grupoId']);
          if (this.grupo != null) {
            Assunto.get(params['assuntoId']).subscribe((assunto) => {
              this.assunto = assunto as Assunto;

              if (
                assunto['questoesColaborativas'] != undefined &&
                assunto['questoesColaborativas'].length > 0
              ) {
                this.questaoColaborativa = this.assunto.getQuestaoColaborativaById(
                  params['questaoId']
                );
                if (this.questaoColaborativa.isOpenEnded == true) {
                  this.apresentarTestesCases = false;
                  this.modoExecucao = ModoExecucao.execucaoPadrao;
                  this.isMudancaEditorPermitida = false;
                }

                if (this.questaoColaborativa != null && this.questaoColaborativa.questao != null) {
                  let questao = QuestaoProgramacao._construirIndividual(
                    this.questaoColaborativa.questao,
                    this.assunto
                  ) as QuestaoProgramacao;
                  if (questao != null) {
                    this.questao = questao;

                    this.submissao = null;
                    Editor.getInstance().codigo.next(null);
                    /* if (this.usuario != null) {
                        Submissao.getRecentePorQuestao(this.questao, this.usuario).subscribe(
                          (submissao: Submissao) => {
                            if (submissao != null) this.submissao = submissao;
                            //this.pausaIde = false;

                            this.atualizarCardErros();
                          }
                        );
                      } */
                  } else {
                    throw new Error('Não é possível iniciar o editor sem uma questão.');
                  }
                }
              }
            });
          } else {
            // TODO: Mostrar mensagem de erro, pois não é possível iniciar uma atividade em grupo, pois o grupo informado não existe
          }
        });
      } else if (params['questaoCorrecaoId'] != null) {
        // Atividade de correção
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto as Assunto;

          if (assunto['questoesCorrecao'] != undefined && assunto['questoesCorrecao'].length > 0) {
            assunto['questoesCorrecao'].forEach((questaoCorrecao) => {
              if (questaoCorrecao.id == params['questaoCorrecaoId']) {
                this.questaoCorrecao = questaoCorrecao;
                this.questao = questaoCorrecao.questao;

                RespostaQuestaoCorrecaoAlgoritmo.getRecentePorQuestao(
                  this.questaoCorrecao,
                  this.usuario
                ).subscribe((correcao: RespostaQuestaoCorrecaoAlgoritmo) => {
                  if (correcao != null) {
                    this.correcao = correcao;
                    this.submissao = Submissao.fromJson(correcao.submissao);
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
        if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {


          Assunto.get(params['assuntoId']).subscribe((assunto) => {
            this.assunto = assunto as Assunto;

            if (
              assunto['questoesProgramacao'] != undefined &&
              assunto['questoesProgramacao'].length > 0
            ) {
              assunto['questoesProgramacao'].forEach((questao) => {
                if (questao.id == params['questaoId']) {
                  this.questao = questao;

                  /* if (this.usuario.grupoExperimento != Groups.control) {
                    DiarioProgramacao.exibirDiario(
                      this.login.getUsuarioLogado(),
                      TipoDiarioProgramacao.planejamento
                    ).subscribe((visibilidade) => {
                      if (visibilidade) {
                        this.dialogService.open(DiarioProgramacaoComponent, {
                          data: { tipo: TipoDiarioProgramacao.planejamento },
                        });
                      }
                    });
                  } */

                  if (this.usuario != null) {
                    // --------- Casos de Teste e Resposta para mandar ao RASA ------
                    let casosTeste = this.questao.testsCases[3];
                    let resposta = this.questao.solucao.codigo;
                    let numeroPergunta = this.questao.ordem;
                    this.chatbotService.sendMessage({ teste: casosTeste, resposta: [resposta, numeroPergunta]});
                    // --------------------------------------------------------------

                    Submissao.getRecentePorQuestao(this.questao, this.usuario).subscribe(
                      (submissao: Submissao) => {
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
        }
      }
    });

    //this.salvarAutomaticamente(); # desabilitado temporariamente por questões de performance.
  }

  atualizarCardErros() {
    Submissao.getPorQuestao(this.questao, this.usuario).subscribe((submissoes) => {
      const erros = Submissao.getAllErros(submissoes);
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
      { outlets: { principal: ['estudantes-questao', this.assunto.id, this.questao.id] } },
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
