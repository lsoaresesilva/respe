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
            /*   mslq.media = (mslq.respostaPergunta1 + mslq.respostaPergunta2 + mslq.respostaPergunta3 + mslq.respostaPergunta4 + mslq.respostaPergunta5+
                                mslq.respostaPergunta6 + mslq.respostaPergunta7 + mslq.respostaPergunta8 + mslq.respostaPergunta9 + mslq.respostaPergunta10+
                                mslq.respostaPergunta11 + mslq.respostaPergunta12 + mslq.respostaPergunta13 + mslq.respostaPergunta14 + mslq.respostaPergunta15+
                                mslq.respostaPergunta16 + mslq.respostaPergunta17 + mslq.respostaPergunta18 + mslq.respostaPergunta19 + mslq.respostaPergunta20 + 
                                mslq.respostaPergunta21 + mslq.respostaPergunta22)/22;
              mslq.srl = (mslq.respostaPergunta14 + mslq.respostaPergunta15+
                                mslq.respostaPergunta16 + mslq.respostaPergunta17 + mslq.respostaPergunta18 + mslq.respostaPergunta19 + mslq.respostaPergunta20 + 
                                mslq.respostaPergunta21 + mslq.respostaPergunta22)/9; 
              mslq.cogstrat = (mslq.respostaPergunta1 + mslq.respostaPergunta2 + mslq.respostaPergunta3 + mslq.respostaPergunta4 + mslq.respostaPergunta5+
                mslq.respostaPergunta6 + mslq.respostaPergunta7 + mslq.respostaPergunta8 + mslq.respostaPergunta9 + mslq.respostaPergunta10+
                mslq.respostaPergunta11 + mslq.respostaPergunta12 + mslq.respostaPergunta13)/13;    */       
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
