import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import Query from 'src/app/model/firestore/query';
import Erro from 'src/app/model/errors/erro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import { ChangeDetectorRef } from '@angular/core';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { AnalisarObjetivosService } from 'src/app/srl/analisar-objetivos.service';
import Analytics from '../../../../model/analytics/analytics';
@Component({
  selector: 'app-acompanhar-desempenho',
  templateUrl: './acompanhar-desempenho.component.html',
  styleUrls: ['./acompanhar-desempenho.component.css']
})
export class AcompanharDesempenhoComponent implements OnInit {

  possuiSubmissoes;
  erros;
  errosConceitos;
  progressoMetaExercicios = 0; // Implementar
  progressoNota = 0;
  progressoTempoOnline = 0;
  respostas;
  assuntos;

  estudante;
  analytics$;

  constructor(private loginService: LoginService,
    private ref: ChangeDetectorRef,
    private analiseObjetivo: AnalisarObjetivosService) {
    this.possuiSubmissoes = false;
  }

  ngOnInit() {
    this.estudante = this.loginService.getUsuarioLogado();
    Analytics.getAnalyticsTurma([this.estudante]).subscribe(analytics=>{
      this.analytics$ = analytics;
    });

    /* Assunto.consultarRespostasEstudante(this.loginService.getUsuarioLogado()).subscribe(respostas=>{
      this.respostas = respostas;
      if(respostas.questoesProgramacao.submissoes.length > 0){
        this.erros = ErroCompilacao.getAllErros(respostas.questoesProgramacao.submissoes);
        this.ref.markForCheck();
        this.possuiSubmissoes = true;
      }

      Assunto.getAll().subscribe(assuntos=>{
        this.assuntos = assuntos;

        //this.errosConceitos = Analytics.calcularErrosConceituais(assuntos, respostas);

      });
    }) */

      // TODO: Fazer isso
      /* this.analiseObjetivo.verificarObjetivoNota(this.login.getUsuarioLogado()).subscribe({
        next: (progresso) => {
          this.progresso = progresso;
        },
      }); */


      /* this.analiseObjetivo.verificarObjetivoExercicios(this.loginService.getUsuarioLogado(), respostas).subscribe({
        next: (progresso) => {
          this.progressoMetaExercicios = progresso;
        },
      });

      this.analiseObjetivo.verificarObjetivoTempoOnline(this.login.getUsuarioLogado()).subscribe({
      next: (progresso) => {
        this.progresso = progresso;
      },
    });

      */



  }



}
