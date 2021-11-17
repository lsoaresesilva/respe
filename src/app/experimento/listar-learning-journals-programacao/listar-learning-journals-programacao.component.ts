import { Component, OnInit } from '@angular/core';
import Query from 'src/app/model/firestore/query';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';

@Component({
  selector: 'app-listar-learning-journals-programacao',
  templateUrl: './listar-learning-journals-programacao.component.html',
  styleUrls: ['./listar-learning-journals-programacao.component.css']
})
export class ListarLearningJournalsProgramacaoComponent implements OnInit {

  diarios;

  constructor() { }

  ngOnInit(): void {
  }

  visualizarPlanejamento(){
    this.getDiarios(TipoDiarioProgramacao.planejamento);
  }

  visualizarMonitoramento(){
    this.getDiarios(TipoDiarioProgramacao.monitoramento);
  }

  visualizarReflexao(){
    this.getDiarios(TipoDiarioProgramacao.reflexao);
  }

  getDiarios(tipo:TipoDiarioProgramacao){
    DiarioProgramacao.getAll(new Query("tipo", "==", tipo)).subscribe(diarios=>{
      this.diarios = diarios;
    })
  }

}
