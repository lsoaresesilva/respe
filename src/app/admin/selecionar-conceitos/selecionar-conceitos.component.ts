import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Query from 'src/app/model/firestore/query';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import Conceito from '../../model/aprendizagem/questoes/conceito';

@Component({
  selector: 'app-selecionar-conceitos',
  templateUrl: './selecionar-conceitos.component.html',
  styleUrls: ['./selecionar-conceitos.component.css']
})
export class SelecionarConceitosComponent implements OnInit, OnChanges {

  @Input() assunto: Assunto;

  conceitos: Conceito[];
  @Input()
  conceitosSelecionados: Conceito[];

  @Output()
  onMudancaConceito = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.assunto != null) {
      Conceito.getAll(new Query('assuntoId', '==', this.assunto.pk())).subscribe(conceitos => {
        this.conceitos = conceitos;
      });
    }
  }

  ngOnInit(): void {
  }

  selecionarConceito(){
    this.onMudancaConceito.emit(this.conceitosSelecionados);
  }

}
