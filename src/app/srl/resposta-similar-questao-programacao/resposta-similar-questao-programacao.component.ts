import { Component, OnInit } from '@angular/core';
import { ModeloRespostaQuestao } from 'src/app/model/ModeloRespostaQuestao';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-resposta-similar-questao-programacao',
  templateUrl: './resposta-similar-questao-programacao.component.html',
  styleUrls: ['./resposta-similar-questao-programacao.component.css']
})
export class RespostaSimilarQuestaoProgramacaoComponent implements OnInit {
  modeloRespostaQuestao;
 
 assuntos: Assunto[];
 rowGroupMetadata: any;
  

  constructor() {
    this.modeloRespostaQuestao= new ModeloRespostaQuestao (null,null);
   }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos;
      // this.updateRowGroupMetaData();
    
    });
  }

//   onSort() {
//     this.updateRowGroupMetaData();
//   }


//   updateRowGroupMetaData() {

//     this.rowGroupMetadata = {};
//     if (this.assuntos) {
//         for (let i = 0; i < this.assuntos.length; i++) {
//             let questao= this.assuntos[i];
//             let nome = questao.nome;
//             if (i == 0) {
//                 this.rowGroupMetadata[questao] = { index: 0, size: 1 };
//             }
//             else {
//                 let previousRowData = this.assuntos[i - 1];
//                 let previousRowGroup = previousRowData.brand;
//                 if (brand === previousRowGroup)
//                     this.rowGroupMetadata[brand].size++;
//                 else
//                     this.rowGroupMetadata[brand] = { index: i, size: 1 };
//             }
//         }
//     }
// }

}
