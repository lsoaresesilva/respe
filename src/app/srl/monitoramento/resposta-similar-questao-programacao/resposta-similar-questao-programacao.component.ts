import { Component, OnInit } from '@angular/core';
import { ModeloRespostaQuestao } from 'src/app/model/modeloRespostaQuestao';
import { Assunto } from 'src/app/model/assunto';
import { Router } from '@angular/router';
import { Questao } from 'src/app/model/questao';

@Component({
  selector: 'app-resposta-similar-questao-programacao',
  templateUrl: './resposta-similar-questao-programacao.component.html',
  styleUrls: ['./resposta-similar-questao-programacao.component.css']
})
export class RespostaSimilarQuestaoProgramacaoComponent implements OnInit {
  modeloRespostaQuestao;
 
 assuntos: Assunto[];
 rowGroupMetadata: any;
 questao;
 resposta;
  

  constructor( private router: Router) {
    this.questao= new Questao(null,null,null,null,null,null,null, "")
    this.modeloRespostaQuestao= new ModeloRespostaQuestao (null,null,this.questao);
   }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos;

      this.updateRowGroupMetaData();

    });
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

   
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.assuntos) {
      for (let i = 0; i < this.assuntos.length; i++) {
        let rowData = this.assuntos[i];
        let questoesProgramacao= rowData.questoesProgramacao;
          if (i == 0) {
            this.rowGroupMetadata[questoesProgramacao] = { index: 0, size: 1 };
          }
          else {
            let previousRowData = this.assuntos[i - 1];
            let previousRowGroup = previousRowData.questoesProgramacao;
            
              if (questoesProgramacao === previousRowGroup)
                this.rowGroupMetadata[questoesProgramacao].size++;
              else
                this.rowGroupMetadata[questoesProgramacao] = { index: i, size: 1 };
          }
      }
    }
  }
    



  salvar(){

    if(this.modeloRespostaQuestao.validar()){
      this.modeloRespostaQuestao.save().subscribe(resultado => {
        alert("Cadastrado com sucesso!");
      },
      err => {
      alert(err);
      });
    }
  } 
}
