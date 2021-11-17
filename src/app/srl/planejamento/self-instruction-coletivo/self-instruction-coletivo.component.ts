import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from 'src/app/chat/chat.service';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import DificuldadeAtividadeGrupo from 'src/app/model/cscl/dificuldadeAtividadeGrupo';
import { Groups } from 'src/app/model/experimento/groups';
import Query from 'src/app/model/firestore/query';
import AutoInstrucaoColetiva from 'src/app/model/srl/autoInstrucaoColetivo';
import JustificativasAutoInstrucao from 'src/app/model/srl/justificativaInstrucaoColetiva';

declare function iniciarSelfInstructionColaborativo(
  id,
  callbackAnaliseProblema,
  callbackAnaliseSolucao
): any;

@Component({
  selector: 'app-self-instruction-coletivo',
  templateUrl: './self-instruction-coletivo.component.html',
  styleUrls: ['./self-instruction-coletivo.component.css'],
})
export class SelfInstructionColetivoComponent implements OnInit, AfterViewInit {
  estudante;

  atividadeGrupo: AtividadeGrupo;
  grupo;
  autoInstrucaoColetiva: AutoInstrucaoColetiva;
  questao;
  estudantes;
  atividadeGrupoId;
  relatoDificuldade: JustificativasAutoInstrucao;
  display;

  isAvancarPlanejamentoHabilitado;
  isSalvarHabilitado;
  isVisualizarJustificativaGrupoHabilitado;
  isVisualizarDificuldadesEstudantesHabilitado;
  pieData;
  pieOpcoes;

  grupoId;

  posicaoVisualizacao;

  @ViewChild('divPlanejamento')
  divPlanejamento: ElementRef;

  @ViewChild('divAnalise')
  divAnalise: ElementRef;

  @ViewChild('divQuestao')
  divQuestao: ElementRef;

  @ViewChild('divAvancar')
  divAvancar: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private messageService: MessageService,
    private chat: ChatService,
    private monitor: MonitorService,
    private renderer: Renderer2
  ) {
    this.posicaoVisualizacao = 1;

    this.display = false;
    this.estudante = this.login.getUsuarioLogado();

    this.isAvancarPlanejamentoHabilitado = true;
    this.isSalvarHabilitado = true;
    this.isVisualizarJustificativaGrupoHabilitado = false;
    this.isVisualizarDificuldadesEstudantesHabilitado = false;

    this.relatoDificuldade = new JustificativasAutoInstrucao(this.estudante, 0, '', '');

    this.route.params.subscribe((params) => {
      if (
        params['atividadeGrupoId'] != null &&
        params['assuntoId'] != null &&
        params['questaoId'] != null
      ) {
        this.atividadeGrupoId = params['atividadeGrupoId'];
      }
    });

    this.pieOpcoes = {
      title: {
        display: true,
        text: 'Como o seu grupo avalia a dificuldade',
        fontSize: 16,
      },
      legend: {
        position: 'top',
      },
    };
  }

  mudarAba(event) {
    if (event.index == 1) {
      let isMensagemProblemSolvingExibida = sessionStorage.getItem('problemSolving');
      if (isMensagemProblemSolvingExibida == null) {
        this.monitor.ajudarProblemSolving(this.estudante, 1);
        sessionStorage.setItem('problemSolving', '1');
      }
    }
  }

  esconderElementos() {
    this.divAnalise.nativeElement.style.display = 'none';
    this.divQuestao.nativeElement.style.display = 'none';
    this.divAvancar.nativeElement.style.display = 'none';
    this.divPlanejamento.nativeElement.style.visibility = 'hidden';
  }

  visualizarQuestao() {
    this.esconderElementos();
    this.divQuestao.nativeElement.style.display = 'block';
  }

  visualizarAnalise() {
    this.esconderElementos();
    this.divAnalise.nativeElement.style.display = 'block';
  }

  visualizarPlanejamento() {
    this.esconderElementos();
    this.divPlanejamento.nativeElement.style.visibility = 'visible';
  }

  avancar() {
    this.esconderElementos();
    this.divAvancar.nativeElement.style.display = 'block';
  }

  ngOnInit(): void {}

  contagemCaracteres(referencia: string, caracteres = 100) {
    if (referencia != null) {
      let restante = caracteres - referencia.length;
      return restante <= 0 ? 0 : restante;
    }
  }

  isJustificativaFinalizada(){
    let justificativa = this.autoInstrucaoColetiva.getJustificativaByEstudante(this.estudante);
    if(justificativa != null){
      return justificativa.isFinalizada();
    }

    return false;
  }

  salvarDificuldadePessoal(){
    if (this.relatoDificuldade.avaliacaoDificuldades.length > 28) {
      this.autoInstrucaoColetiva.atualizarJustificativaEstudante(
        this.estudante,
        this.relatoDificuldade
      );
      this.autoInstrucaoColetiva.save().subscribe(() => {});
    }
  }

  selecionarDificuldade() {
    //this.display = true;
  }

  salvarDificuldade() {
    if (this.atividadeGrupo != null && this.grupo != null) {
      this.autoInstrucaoColetiva.atualizarJustificativaEstudante(
        this.estudante,
        this.relatoDificuldade
      );
      this.autoInstrucaoColetiva.save().subscribe(
        () => {
          this.display = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Informação enviada com sucesso.',
            detail: '',
          });
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha ao salvar a informação.',
            detail: 'Tente novamente em alguns instantes.',
          });
        }
      );
    }
  }

  ngAfterViewInit() {
    AtividadeGrupo.get(this.atividadeGrupoId).subscribe((atividadeGrupo) => {

      let observavel = new Subject();

      observavel.subscribe(()=>{

        this.grupo.getEstudantes().subscribe((estudantes) => {
          this.estudantes = estudantes;

        });

        let callbackAtualizacaoSelfInstruction = new BehaviorSubject<any>(null);

        callbackAtualizacaoSelfInstruction.subscribe((atualizacao) => {
          if (atualizacao != null) {

            this.grupo = this.atividadeGrupo.getGrupoByEstudante(this.estudante);



            this.autoInstrucaoColetiva = atualizacao;

            if (this.autoInstrucaoColetiva.isFinalizada) {
              this.router.navigate([
                'geral/main',
                {
                  outlets: {
                    principal: [
                      'juiz',
                      'atividade-grupo',
                      this.atividadeGrupoId,
                      this.grupo.id,
                      this.atividadeGrupo['assuntoId'],
                      this.atividadeGrupo['questaoColaborativaId'],
                    ],
                  },
                },
              ]);
            } else {
              this.pieData = this.autoInstrucaoColetiva.gerarDadosGrafico();

              let justificativa = this.autoInstrucaoColetiva.getJustificativaByEstudante(
                this.estudante
              );
              this.isVisualizarJustificativaGrupoHabilitado =
                justificativa != null ? true : false;
              if (justificativa != null) {
                this.isVisualizarDificuldadesEstudantesHabilitado =
                  justificativa.avaliacaoDificuldades != '' ? true : false;
              }

              this.isAvancarPlanejamentoHabilitado = !this.autoInstrucaoColetiva.podeVisualizarPlanejamento(
                this.grupo
              );
              this.isSalvarHabilitado = !this.autoInstrucaoColetiva.podeVisualizarAvancar(
                this.autoInstrucaoColetiva.analiseProblema,
                this.autoInstrucaoColetiva.analiseSolucao
              );
            }
          }
        });

        AutoInstrucaoColetiva.getByQuery(new Query('grupoId', '==', this.grupo.id)).subscribe(
          (autoInstrucaoColetiva) => {
            this.autoInstrucaoColetiva = autoInstrucaoColetiva;

            this.isVisualizarJustificativaGrupoHabilitado =
              this.autoInstrucaoColetiva.getJustificativaByEstudante(this.estudante) != null
                ? true
                : false;

            this.autoInstrucaoColetiva.justificativas.forEach((justificativa) => {
              if (justificativa.estudante.pk() == this.login.getUsuarioLogado().pk()) {
                this.relatoDificuldade.dificuldade = justificativa.dificuldade;
                this.relatoDificuldade.texto = justificativa.texto;
                this.relatoDificuldade.avaliacaoDificuldades = justificativa.avaliacaoDificuldades;
              }
            });

            AutoInstrucaoColetiva.onDocumentUpdate(
              this.autoInstrucaoColetiva.pk(),
              callbackAtualizacaoSelfInstruction
            );
          }
        );



        Assunto.get(this.atividadeGrupo['assuntoId']).subscribe((assunto) => {
          this.questao = assunto.getQuestaoColaborativaById(
            this.atividadeGrupo['questaoColaborativaId']
          );
          iniciarSelfInstructionColaborativo(
            this.grupo.id,
            (analiseProblema) => {
              this.autoInstrucaoColetiva.analiseProblema = analiseProblema;
              this.autoInstrucaoColetiva.save().subscribe();
            },
            (analiseSolucao) => {
              this.autoInstrucaoColetiva.analiseSolucao = analiseSolucao;
              this.autoInstrucaoColetiva.save().subscribe();
            }
          );
        });
      });

      this.atividadeGrupo = atividadeGrupo;

      let grupo = this.atividadeGrupo.getGrupoByEstudante(this.estudante);



      if (grupo == null) {
        // Deve pegar um grupo já criado e verificar se há espaço nele.
        let grupoDisponivel = this.atividadeGrupo.getGrupoDisponivel();

        if (grupoDisponivel.length == 0) {
          this.atividadeGrupo.criarGrupo(this.estudante).subscribe((grupo) => {
            this.grupo = grupo;

            observavel.next();
            observavel.complete();

          });
        }else{
          this.grupo = grupoDisponivel[0];


          this.atividadeGrupo.adicionarEstudante(this.estudante, grupoDisponivel[0]);

          this.atividadeGrupo.save().subscribe(()=>{
            observavel.next();
            observavel.complete();
          })




          /* Assunto.get(this.atividadeGrupo['assuntoId']).subscribe((assunto) => {
            this.questao = assunto.getQuestaoColaborativaById(
              this.atividadeGrupo['questaoColaborativaId']
            );
            iniciarSelfInstructionColaborativo(
              this.grupo.id,
              (analiseProblema) => {
                this.autoInstrucaoColetiva.analiseProblema = analiseProblema;
                this.autoInstrucaoColetiva.save().subscribe();
              },
              (analiseSolucao) => {
                this.autoInstrucaoColetiva.analiseSolucao = analiseSolucao;
                this.autoInstrucaoColetiva.save().subscribe();
              }
            );
          }); */
        }


      } else {
        this.grupo = grupo;

        observavel.next();
        observavel.complete();
        /* Assunto.get(this.atividadeGrupo['assuntoId']).subscribe((assunto) => {
          this.questao = assunto.getQuestaoColaborativaById(
            this.atividadeGrupo['questaoColaborativaId']
          );
          iniciarSelfInstructionColaborativo(
            this.grupo.id,
            (analiseProblema) => {
              this.autoInstrucaoColetiva.analiseProblema = analiseProblema;
              this.autoInstrucaoColetiva.save().subscribe();
            },
            (analiseSolucao) => {
              this.autoInstrucaoColetiva.analiseSolucao = analiseSolucao;
              this.autoInstrucaoColetiva.save().subscribe();
            }
          );
        }); */
      }



      /*if (this.atividadeGrupo != null && this.grupo.id != null) {
         this.chat.iniciar(this.grupo.id).subscribe((resposta) => {
          if (resposta) {
            this.chat.receberMensagens();
            //this.isConectado = true;
          }
        });
      }*/

      //this.monitor.ajudarProblemSolving(this.estudante, 0);
    });
  }

  getJustificativas(){

    if(this.autoInstrucaoColetiva != null && Array.isArray(this.autoInstrucaoColetiva.justificativas) && this.autoInstrucaoColetiva.justificativas.length > 0){
      return this.autoInstrucaoColetiva.justificativas;
    }else{
      return [];
    }

  }









  selecionarLider() {
    if (this.autoInstrucaoColetiva.lider != null) {
      this.autoInstrucaoColetiva.save().subscribe();
    }
  }

  salvar() {
    this.autoInstrucaoColetiva.isFinalizada = true;
    this.autoInstrucaoColetiva.save().subscribe(() => {});
  }
}
