import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import DificuldadeAtividadeGrupo from 'src/app/model/cscl/dificuldadeAtividadeGrupo';
import Query from 'src/app/model/firestore/query';
import AutoInstrucaoColetiva from 'src/app/model/srl/autoInstrucaoColetivo';

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
  atividadeGrupo;
  grupo;
  autoInstrucaoColetiva: AutoInstrucaoColetiva;
  questao;
  estudantes: SelectItem[];
  atividadeGrupoId;
  grupoId;
  relatoDificuldade:DificuldadeAtividadeGrupo;

  constructor(private route: ActivatedRoute, private router:Router, private login:LoginService) {
    this.autoInstrucaoColetiva = new AutoInstrucaoColetiva(null, '', '', this.grupo);
    this.relatoDificuldade = new DificuldadeAtividadeGrupo(null, this.atividadeGrupo, this.grupo, this.login.getUsuarioLogado(), 0, "");
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
    this.estudantes = [
      { label: 'Selecione o líder da equipe', value: null }
    ]
  }

  ngOnInit(): void {}

  contagemCaracteres(referencia: string) {
    if (referencia != null) {
      let restante = 200 - referencia.length;
      return restante <= 0 ? 0 : restante;
    }
  }

  salvarDificuldade(){
    if(this.atividadeGrupo != null && this.grupo != null){

      this.relatoDificuldade.atividadeGrupo = this.atividadeGrupo;
      this.relatoDificuldade.grupo = this.grupo;
      this.relatoDificuldade.save().subscribe(()=>{
        let consultas = [];
        DificuldadeAtividadeGrupo.getAll([new Query("grupoId", "==", this.grupoId)]).subscribe(dificuldades=>{

        })
      })
    }
  }

  ngAfterViewInit() {
    AtividadeGrupo.get(this.atividadeGrupoId).subscribe((atividadeGrupo) => {
      this.atividadeGrupo = atividadeGrupo;
      this.grupo = this.atividadeGrupo.getGrupo(this.grupoId);
      this.grupo.getEstudantes().subscribe(estudantes=>{
        estudantes.forEach(estudante => {
          this.estudantes.push(
            { label: estudante.nome, value: estudante }
            )
        });
      })
      
      
      Assunto.get(this.atividadeGrupo.assuntoId).subscribe((assunto) => {
        this.questao = assunto.getQuestaoColaborativaById(
          this.atividadeGrupo.questaoColaborativaId
        );
        iniciarSelfInstructionColaborativo(
          this.grupo.id,
          (analiseProblema) => {
            this.autoInstrucaoColetiva.analiseProblema = analiseProblema;
          },
          (analiseSolucao) => {
            this.autoInstrucaoColetiva.analiseSolucao = analiseSolucao;
          }
        );
      });
    });
  }

  salvar(){
    this.autoInstrucaoColetiva.save().subscribe(()=>{

    })
  }
}
