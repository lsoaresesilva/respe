import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ChangeDetectorRef,
  ApplicationRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import Editor from 'src/app/model/editor';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import PedidoAjuda from 'src/app/model/pedidoAjuda';
import { Util } from 'src/app/model/util';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from '../../../login-module/login.service';

import ErroEditor from 'src/app/model/erroEditor';

import { FormBuilder } from '@angular/forms';
import Submissao from 'src/app/model/submissao';
import ConsoleEditor from 'src/app/model/consoleEditor';
import ErroServidor from 'src/app/model/errors/erroServidor';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';
import { Observable } from 'rxjs';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import Usuario from 'src/app/model/usuario';
import PontuacaoQuestaoProgramacao from 'src/app/model/gamification/pontuacaoQuestaoProgramacao';
import Gamification from 'src/app/model/gamification/gamification';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { ConfirmationService } from 'primeng/api';
import { ChatService } from 'src/app/cscl/chat.service';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import CorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import { DialogService } from 'primeng/dynamicdialog';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { ModoExecucao } from 'src/app/model/juiz/enum/modoExecucao';

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
  submissao: Submissao;
  dialogPedirAjuda: boolean = false;
  duvida: string = '';

  observableQuestao: Observable<any>;
 
  usuario: Usuario;

  /* CSCL */
  atividadeGrupo:AtividadeGrupo;
  grupo:Grupo;
  

  questaoCorrecao;


  modoVisualizacao;

  constructor(
    private route: ActivatedRoute,
    public login: LoginService,
    private router: Router,
    private apresentacao: ApresentacaoService,
    public chat: ChatService,
    public dialogService: DialogService
  ) {
    this.pausaIde = true;
    this.statusExecucao = '';
    
    this.observableQuestao = new Observable((observer) => {
      observer.next();
      observer.complete();
    });


  }

  ngAfterViewInit(): void {
    let _this = this;
    setTimeout(function (){
      _this.route.params.subscribe((params) => {
        
      });
    }, 3000);

    
  }

  

  visualizarPlanejamento(){
    this.router.navigate([
      'main',
      { outlets: { principal: ['self-instruction-editor', this.assunto.pk(), this.questao.id] } },
    ]);
  }

  onEditorError(event){
    this.atualizarCardErros();
    
  }

  

  ngOnInit() {
    this.usuario = this.login.getUsuarioLogado();

    DiarioProgramacao.exibirDiario(this.login.getUsuarioLogado(), TipoDiarioProgramacao.planejamento).subscribe(visibilidade=>{
      if(visibilidade){
        this.dialogService.open(DiarioProgramacaoComponent, {
          data: { tipo: TipoDiarioProgramacao.planejamento },
        });
      }
    });
    

    if (this.usuario == null) {
      throw new Error('Não é possível executar o código, pois você não está logado.'); // TODO: mudar para o message
    }

    this.route.params.subscribe((params) => {
      
      // Atividade em grupo
      
      if (params['atividadeGrupoId'] != null && params['grupoId'] != undefined && params['assuntoId'] != undefined && params['questaoId'] != undefined) {
          AtividadeGrupo.get(params['atividadeGrupoId']).subscribe(atividadeGrupo=>{
            this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
            this.grupo = this.atividadeGrupo.getGrupo(params['grupoId']);
            if(this.grupo != null){
              Assunto.get(params['assuntoId']).subscribe((assunto) => {
                this.assunto = assunto  as Assunto;
      
                if (
                  assunto['questoesColaborativas'] != undefined &&
                  assunto['questoesColaborativas'].length > 0
                ) {
  
                  let questaoColaborativa = this.assunto.getQuestaoColaborativaById(params['questaoId']);
                  if(questaoColaborativa != null && questaoColaborativa.questao != null){
                    let questao = QuestaoProgramacao._construirIndividual(questaoColaborativa.questao, this.assunto) as QuestaoProgramacao;
                    if(questao != null){
                      this.questao = questao;
  
                      /* if (this.usuario != null) {
                        Submissao.getRecentePorQuestao(this.questao, this.usuario).subscribe(
                          (submissao: Submissao) => {
                            if (submissao != null) this.submissao = submissao;
                            //this.pausaIde = false;
      
                            this.atualizarCardErros();
                          }
                        );
                      } */
  
                      
                    }else{
                      throw new Error('Não é possível iniciar o editor sem uma questão.');
                    }
                  }
                }
              });
            }else{
              // TODO: Mostrar mensagem de erro, pois não é possível iniciar uma atividade em grupo, pois o grupo informado não existe
            }
            
          })
      }else if(params['questaoCorrecaoId'] != null){ // Atividade de correção
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto as Assunto;

          if (
            assunto['questoesCorrecao'] != undefined &&
            assunto['questoesCorrecao'].length > 0
          ) {
            assunto['questoesCorrecao'].forEach((questaoCorrecao) => {
              if (questaoCorrecao.id == params['questaoCorrecaoId']) {
                this.questaoCorrecao = questaoCorrecao;
                this.questao = questaoCorrecao.questao;
                

                CorrecaoAlgoritmo.getRecentePorQuestao(this.questaoCorrecao, this.usuario).subscribe(
                  (correcao: CorrecaoAlgoritmo) => {
                    if (correcao != null){
                      this.correcao = correcao;
                      this.submissao = Submissao.fromJson(correcao.submissao);
                    } else{
                      this.questaoCorrecao.getSubmissaoComErro(this.usuario).subscribe(submissaoErro=>{
                        this.submissao = submissaoErro;
                      })
                    }

                  }
                );
              }
            });
          }
          });
      }
      else{
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
  
                  if (this.usuario != null) {
                    Submissao.getRecentePorQuestao(this.questao, this.usuario).subscribe(
                      (submissao: Submissao) => {
                        if (submissao != null) this.submissao = submissao;
                        //this.pausaIde = false;
  
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

  listarSubmissao() {
    this.router.navigate([
      'main',
      { outlets: { principal: ['estudantes-questao', this.assunto.id, this.questao.id] } },
    ]);
  }

  /*enviarErroEditor() {
    let submissao = this.prepararSubmissao();
    submissao.save().subscribe(submissao => {
      let errorEditor = new ErroEditor(null, submissao.pk());
      errorEditor.save().subscribe(erro => {
        alert("Erro notificado com sucesso. Obrigado!");
      });
    });

  }*/

  

  /*change(event){
    event.preventDefault();
    console.log("DOM value changed" ,event);
    console.log("component value", this.elementRef.nativeElement);
    this.zone.run(() => { console.log('Do change detection here');
    //this.cdr.detectChanges();
    if(this.elementRef.nativeElement.querySelectorAll('input')[0].outerHTML === event.target.outerHTML)
    {
        console.log('Inside value updation');

        this.customerForm.controls['name'].setValue(event.target.value);
    }
});
    setTimeout(() =>{
        this.cdr.markForCheck();
    })
}*/
}
