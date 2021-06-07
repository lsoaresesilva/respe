import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import DificuldadeAtividadeGrupo from 'src/app/model/cscl/dificuldadeAtividadeGrupo';
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

  atividadeGrupo;
  grupo;
  autoInstrucaoColetiva: AutoInstrucaoColetiva;
  questao;
  estudantes;
  atividadeGrupoId;
  grupoId;
  relatoDificuldade: JustificativasAutoInstrucao;
  display;

  isAvancarPlanejamentoHabilitado;
  isSalvarHabilitado;
  isVisualizarJustificativaGrupoHabilitado;

  pieData;
  pieOpcoes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private messageService: MessageService
  ) {
    this.display = false;
    this.estudante = this.login.getUsuarioLogado();

    this.isAvancarPlanejamentoHabilitado = true;
    this.isSalvarHabilitado = true;
    this.isVisualizarJustificativaGrupoHabilitado = false;

    this.relatoDificuldade = new JustificativasAutoInstrucao(this.estudante, 0, '');

    this.route.params.subscribe((params) => {
      if (
        params['atividadeGrupoId'] != null &&
        params['grupoId'] != null &&
        params['assuntoId'] != null &&
        params['questaoId'] != null
      ) {
        this.atividadeGrupoId = params['atividadeGrupoId'];
        this.grupoId = params['grupoId'];
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

  ngOnInit(): void {}

  contagemCaracteres(referencia: string) {
    if (referencia != null) {
      let restante = 200 - referencia.length;
      return restante <= 0 ? 0 : restante;
    }
  }

  selecionarDificuldade() {
    this.display = true;
  }

  salvarDificuldade() {
    if (this.atividadeGrupo != null && this.grupo != null) {
      this.autoInstrucaoColetiva.atualizarJustificativaEstudante(this.estudante, this.relatoDificuldade);
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
      this.atividadeGrupo = atividadeGrupo;
      this.grupo = this.atividadeGrupo.getGrupo(this.grupoId);

      let callbackAtualizacaoSelfInstruction = new BehaviorSubject<any>(null);


      callbackAtualizacaoSelfInstruction.subscribe((atualizacao) => {
        
        if (atualizacao != null) {

          this.autoInstrucaoColetiva = atualizacao;

          if( this.autoInstrucaoColetiva.isFinalizada ){
            this.router.navigate(["geral/main", { outlets: { principal: ['juiz', 'atividade-grupo', this.atividadeGrupoId, this.grupoId, this.atividadeGrupo["assuntoId"], this.atividadeGrupo["questaoColaborativaId"]] } }]);
          }else{
            this.pieData = this.autoInstrucaoColetiva.gerarDadosGrafico();

            this.isVisualizarJustificativaGrupoHabilitado =  this.autoInstrucaoColetiva.getJustificativaByEstudante(this.estudante) != null?true:false;
            this.isAvancarPlanejamentoHabilitado = !this.autoInstrucaoColetiva.podeVisualizarPlanejamento(this.grupo);
            this.isSalvarHabilitado = !this.autoInstrucaoColetiva.podeVisualizarAvancar(this.autoInstrucaoColetiva.analiseProblema, this.autoInstrucaoColetiva.analiseSolucao);
          }

          
        }
      });

      AutoInstrucaoColetiva.getByQuery(new Query('grupoId', '==', this.grupoId)).subscribe(
        (autoInstrucaoColetiva) => {
          this.autoInstrucaoColetiva = autoInstrucaoColetiva;

          this.isVisualizarJustificativaGrupoHabilitado =  this.autoInstrucaoColetiva.getJustificativaByEstudante(this.estudante) != null?true:false;

          this.autoInstrucaoColetiva.justificativas.forEach((justificativa) => {
            if (justificativa.estudante.pk() == this.login.getUsuarioLogado().pk()) {
              this.relatoDificuldade.dificuldade = justificativa.dificuldade;
            }
          });

          AutoInstrucaoColetiva.onDocumentUpdate(
            this.autoInstrucaoColetiva.pk(),
            callbackAtualizacaoSelfInstruction
          );
        }
      );

      this.grupo.getEstudantes().subscribe((estudantes) => {
        this.estudantes = estudantes;
        /* estudantes.forEach((estudante) => {
          this.estudantes.push({ label: estudante.nome, value: estudante });
        }); */
      });

      Assunto.get(this.atividadeGrupo.assuntoId).subscribe((assunto) => {
        this.questao = assunto.getQuestaoColaborativaById(
          this.atividadeGrupo.questaoColaborativaId
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
  }

  selecionarLider(){
    if(this.autoInstrucaoColetiva.lider != null){
      this.autoInstrucaoColetiva.save().subscribe();
    }
  }


  salvar() {
    this.autoInstrucaoColetiva.isFinalizada = true;
    this.autoInstrucaoColetiva.save().subscribe(() => {

    });
  }
}
