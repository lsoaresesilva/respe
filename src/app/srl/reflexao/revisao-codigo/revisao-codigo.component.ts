import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Query from 'src/app/model/firestore/query';
import Submissao from 'src/app/model/submissao';

@Component({
  selector: 'app-revisao-codigo',
  templateUrl: './revisao-codigo.component.html',
  styleUrls: ['./revisao-codigo.component.css']
})
export class RevisaoCodigoComponent implements OnChanges {

  @Input()
  estudante;

  revisoes;

  constructor() { 
    this.revisoes = []
  }

  ngOnChanges(): void {

    Submissao.getAll(new Query('estudanteId', '==', this.estudante.pk())).subscribe(
      (submissoes) => {
        // Agrupar por questões
        let questoes = new Map<string, Submissao[]>();

        submissoes.forEach(submissao=>{

          let hasQuestao = questoes.get(submissao.questaoId);
          if (hasQuestao == null) {
            questoes.set(submissao.questaoId, []);
          }

          hasQuestao = questoes.get(submissao.questaoId);
          hasQuestao.push(submissao);


        });

        let _this = this;
        questoes.forEach(function(value, key){
          // Identificar quando houve a submissão correta
          let submissoesCorretas = Submissao.filtrarSubmissoesConcluidas(value);
          if(submissoesCorretas.length > 0){
            _this.revisoes.push(submissoesCorretas);
          }
          // Pegar a sua data
          // Verificar outras submissões corretas e comparar a data
          // Verificar
        })
      });

  }

}
