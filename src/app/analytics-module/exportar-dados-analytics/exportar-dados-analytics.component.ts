import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import AnalyticsProgramacao from 'src/app/model/analytics/analyticsProgramacao';
import Estatisticas from 'src/app/model/analytics/estatisticas';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import { Assunto } from 'src/app/model/assunto';
import Query from 'src/app/model/firestore/query';
import Submissao from 'src/app/model/submissao';
import Turma from 'src/app/model/turma';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-exportar-dados-analytics',
  templateUrl: './exportar-dados-analytics.component.html',
  styleUrls: ['./exportar-dados-analytics.component.css']
})
export class ExportarDadosAnalyticsComponent implements OnInit {

  json;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Recuperar todos os estudantes da turma
    // Recuperar as respostas que eles deram para as questões
    // Verificar da data atual para 7 dias atrás aqueles que não tem nenhuma
    let dadoExportado = {registros:[]}
    this.route.params.subscribe((params) => {
      if (params['turmaId'] != null) {

        /* Submissao.exportToJson().subscribe(resultados=>{
          this.json = resultados;
        }) */
        /* Turma.getAllEstudantes(params['turmaId']).subscribe(estudantes=>{
          let consultaSubmissoes = {};
          estudantes.forEach(estudante=>{
            consultaSubmissoes[estudante.pk()] = Usuario.getTodasSubmissoes(estudante);
          })

          Estatisticas.gerarDadosPageTrack(estudantes).subscribe(dados=>{
            this.json = JSON.stringify(dados);
          })

          Assunto.getAll().subscribe(assuntos=>{
            forkJoin(consultaSubmissoes).subscribe(submissoes=>{
              for(let [estudanteId, submissoesEstudante] of Object.entries(submissoes)){
                let s = submissoesEstudante as any;
                let totalErrosSintaxe = AnalyticsProgramacao.calcularTotalErrosProgramacao(s);
                let totalErrosLogicos = AnalyticsProgramacao.calcularTotalErrosLogicos(s);
                let totalExecucoes = AnalyticsProgramacao.calcularExecucoes(s);
                let tempoMedioSubmissoes = AnalyticsProgramacao.calcularTempoMedioEntreSubmissoes(s);
                let progresso = AnalyticsProgramacao.calcularProgressoProgramacao(assuntos, s);
                let dado = [estudanteId, totalErrosSintaxe, totalErrosLogicos, totalExecucoes, tempoMedioSubmissoes, progresso];
                dadoExportado.registros.push(dado);
              }
              this.json = JSON.stringify(dadoExportado);
            })
          })

          
        }) */
      }
    });
  }

}
