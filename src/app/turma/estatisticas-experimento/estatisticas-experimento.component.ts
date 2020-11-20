import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConhecimentoProgramacao,
  getLabelPorConhecimento,
} from 'src/app/model/enums/conhecimentoProgramacao';
import { CategoriaErro } from 'src/app/model/errors/enum/categoriasErro';
import Experiment from 'src/app/model/experimento/experiment';
import { Groups } from 'src/app/model/experimento/groups';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-estatisticas-experimento',
  templateUrl: './estatisticas-experimento.component.html',
  styleUrls: ['./estatisticas-experimento.component.css'],
})
export class EstatisticasExperimentoComponent implements OnInit {
  dados_categoria_experimental;
  dados_categoria_controle;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['codigoTurma'] != null) {
        Usuario.getAllEstudantesByTurma(params['codigoTurma']).subscribe((estudantes) => {
          const categorias = Experiment.construirCategoriasAlunos(estudantes);
          this.dados_categoria_experimental = this.construirDados(Groups.experimentalA, categorias);
          this.dados_categoria_controle = this.construirDados(Groups.control, categorias);

          let experimental = '';
          let controle = '';
          estudantes.forEach((estudante: Usuario) => {
            if (estudante.grupoExperimento == Groups.experimentalA) {
              experimental += estudante.email + ', ';
            }

            if (estudante.grupoExperimento == Groups.control) {
              controle += estudante.email + ', ';
            }
          });
          console.log('Experimental');
          console.log(experimental);
          console.log('Controle');
          console.log(controle);
        });
      }
    });
  }

  construirDados(grupo: Groups, dados: Map<ConhecimentoProgramacao, Map<Groups, number>>) {
    const data = {
      labels: [
        getLabelPorConhecimento(ConhecimentoProgramacao.nenhum),
        getLabelPorConhecimento(ConhecimentoProgramacao.pouco),
        getLabelPorConhecimento(ConhecimentoProgramacao.medio),
        getLabelPorConhecimento(ConhecimentoProgramacao.programador),
      ],
      datasets: [
        {
          label: 'First Dataset',
          data: [
            dados.get(ConhecimentoProgramacao.nenhum).get(grupo),
            dados.get(ConhecimentoProgramacao.pouco).get(grupo),
            dados.get(ConhecimentoProgramacao.medio).get(grupo),
            dados.get(ConhecimentoProgramacao.programador).get(grupo),
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#F36A56'],
        },
      ],
    };

    return data;
  }
}
