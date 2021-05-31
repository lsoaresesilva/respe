import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
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

  atividadeGrupoId;
  grupoId;

  constructor(private route: ActivatedRoute) {
    this.autoInstrucaoColetiva = new AutoInstrucaoColetiva(null, '', '', this.grupo);
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
  }

  ngOnInit(): void {}

  contagemCaracteres(referencia: string) {
    if (referencia != null) {
      let restante = 200 - referencia.length;
      return restante <= 0 ? 0 : restante;
    }
  }

  ngAfterViewInit() {
    AtividadeGrupo.get(this.atividadeGrupoId).subscribe((atividadeGrupo) => {
      this.atividadeGrupo = atividadeGrupo;
      this.grupo = this.atividadeGrupo.getGrupo(this.grupoId);

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
}
