import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import Query from 'src/app/model/firestore/query';
import Erro from 'src/app/model/errors/erro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import { ChangeDetectorRef } from '@angular/core';
import { Assunto } from 'src/app/model/sistema-aprendizagem/assunto';
@Component({
  selector: 'app-acompanhar-desempenho',
  templateUrl: './acompanhar-desempenho.component.html',
  styleUrls: ['./acompanhar-desempenho.component.css']
})
export class AcompanharDesempenhoComponent implements OnInit {

  possuiSubmissoes;
  erros;

  respostas;
  assuntos;

  constructor(private loginService: LoginService, private ref: ChangeDetectorRef) {
    this.possuiSubmissoes = false;
  }

  ngOnInit() {
    Assunto.consultarRespostasEstudante(this.loginService.getUsuarioLogado()).subscribe(respostas=>{
      this.respostas = respostas;
      if(respostas.submissoes.length > 0){
        this.erros = ErroCompilacao.getAllErros(respostas.submissoes);
        this.ref.markForCheck();
        this.possuiSubmissoes = true;
      }
      
    })

    Assunto.getAll().subscribe(assuntos=>{
      this.assuntos = assuntos;
    })
    /* Submissao.getAll(new Query("estudanteId", "==", this.loginService.getUsuarioLogado().pk()), "data").subscribe(submissoes => {
      
        
    }) */
    
  }

  

}
