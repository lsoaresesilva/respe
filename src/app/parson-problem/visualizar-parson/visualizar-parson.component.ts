import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { OrientacaoParson } from 'src/app/model/parson-problem/enum/orientacaoParson';
import ParsonProblem from 'src/app/model/parson-problem/parsonProblem';
import SegmentoParson from 'src/app/model/parson-problem/segmentoParson';

@Component({
  selector: 'app-visualizar-parson',
  templateUrl: './visualizar-parson.component.html',
  styleUrls: ['./visualizar-parson.component.css'],
})
export class VisualizarParsonComponent implements OnInit {
  parson: ParsonProblem;
  segmentoSelecionado;

  constructor() {
    this.parson = new ParsonProblem(
      null,
      [new SegmentoParson(null, "print('Olá')", 1), new SegmentoParson(null, "print('Mundo!')", 2)],
      'bla',
      'ble',
      [],
      [],
      [1, 2]
    );
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  enviar() {
    let x = this.parson.isSequenciaCorreta();
    let y = x;
  }
}
