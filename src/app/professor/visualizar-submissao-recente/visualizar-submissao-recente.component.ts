import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/questoes/assunto';
import Submissao from 'src/app/model/submissao';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-submissao-recente',
  templateUrl: './visualizar-submissao-recente.component.html',
  styleUrls: ['./visualizar-submissao-recente.component.css']
})
export class VisualizarSubmissaoRecenteComponent implements OnInit {

  submissao:Submissao;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      Assunto.get(params["assuntoId"]).subscribe(assunto=>{
        let questao = assunto.getQuestaoProgramacaoById(params["questaoId"]);
        Usuario.get(params["usuarioId"]).subscribe(estudante=>{
          Submissao.getRecentePorQuestao(questao, estudante).subscribe(submissao=>{
            this.submissao = submissao as Submissao;
          })
        })

      })
    })
  }

}
