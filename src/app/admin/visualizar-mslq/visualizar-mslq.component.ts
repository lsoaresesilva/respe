import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-visualizar-mslq',
  templateUrl: './visualizar-mslq.component.html',
  styleUrls: ['./visualizar-mslq.component.css']
})
export class VisualizarMslqComponent implements OnInit {

  estudantes;

  constructor(private route:ActivatedRoute) {
    route.params.subscribe(params=>{
      Turma.getAllEstudantes(params["codigoTurma"]).subscribe(estudantes=>{
        this.estudantes = estudantes;

        this.estudantes.map(estudante=>{
          QuestionarioAutorregulacao.getByQuery(new Query("usuarioId", "==", estudante.pk())).subscribe(mslq=>{
            if(mslq != null){
              mslq.respostaPergunta3 = 6 - mslq.respostaPergunta3;
              mslq.respostaPergunta15 = 6 - mslq.respostaPergunta15;
              mslq.respostaPergunta19 = 6 - mslq.respostaPergunta19;
              mslq.respostaPergunta20 = 6 - mslq.respostaPergunta20;
              estudante.mslq = mslq;
            }

          });
        })
      })
    })

  }

  ngOnInit(): void {
  }

}
