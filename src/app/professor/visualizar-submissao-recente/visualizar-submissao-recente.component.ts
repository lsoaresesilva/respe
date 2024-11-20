import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import RespostaQuestaoProgramacao from 'src/app/model/aprendizagem/questoes/respostaQuestaoProgramacao';

import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-submissao-recente',
  templateUrl: './visualizar-submissao-recente.component.html',
  styleUrls: ['./visualizar-submissao-recente.component.css']
})
export class VisualizarSubmissaoRecenteComponent implements OnInit {

  submissao:RespostaQuestaoProgramacao;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      Assunto.get(params["assuntoId"]).subscribe(assunto=>{
        let questao = assunto.getQuestaoProgramacaoById(params["questaoId"]);
        Usuario.get(params["usuarioId"]).subscribe(estudante=>{
          RespostaQuestaoProgramacao.filtrarRecente(questao).subscribe(submissao=>{
            this.submissao = submissao as RespostaQuestaoProgramacao;
          })
        })

      })
    })
  }

}
