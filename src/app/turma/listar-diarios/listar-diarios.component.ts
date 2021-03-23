import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { getLabelNivelMotivacao } from 'src/app/model/enums/motivacao';
import Query from 'src/app/model/firestore/query';
import { getLabelNivelConfianca, NivelConfianca } from 'src/app/model/nivelConfianca';
import Diario from 'src/app/model/srl/diario';
import Turma from 'src/app/model/turma';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listar-diarios',
  templateUrl: './listar-diarios.component.html',
  styleUrls: ['./listar-diarios.component.css']
})
export class ListarDiariosComponent implements OnInit {

  pesquisaTurmas;
  turmaSelecionada;
  diarios$;

  constructor() {
    this.diarios$ = [];
   }

  ngOnInit(): void {
  }

  pesquisarTurma(event) {
    Turma.pesquisar(new Query('codigo', '==', event.query)).subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });
  }

  selecionarTurma(event) {
    Turma.getAllEstudantes(this.turmaSelecionada.codigo).subscribe((estudantes) => {
      let consultas = [];
      
      estudantes.forEach(estudante=>{
        consultas.push(Diario.getAll(new Query("estudanteId", "==", estudante.pk())));
        this.diarios$.push({estudante:estudante});
      })

      forkJoin(consultas).subscribe(resultado=>{
        this.diarios$.forEach(diario => {
          resultado.forEach(d=>{
            if(d[0] != null && diario.estudante.pk() == d[0]["estudanteId"]){
              diario.diarios = this.ordenarDiarios(d);
            }
          })
        });
      })
      
    });
  }

  formatarData(data){
    return Util.formatarData(data);
  }

  ordenarDiarios(diarios){
    
    return diarios.sort((d1, d2)=>{
      return Util.diffBetweenDates(new Date (d1.data.seconds * 1000), new Date (d2.data.seconds * 1000));
    })
  }

  getNivelConfianca(nivelConfianca){
    return getLabelNivelConfianca(nivelConfianca);
  }

  getNivelMotivacao(nivelMotivacao){
    return getLabelNivelMotivacao(nivelMotivacao);
  }

}
