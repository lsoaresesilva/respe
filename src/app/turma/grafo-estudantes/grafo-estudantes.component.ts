import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import Query from 'src/app/model/firestore/query';
import Grafo from 'src/app/model/grafo/grafo';

@Component({
  selector: 'app-grafo-estudantes',
  templateUrl: './grafo-estudantes.component.html',
  styleUrls: ['./grafo-estudantes.component.css'],
})
export class GrafoEstudantesComponent implements OnChanges {
  @Input()
  estudante;

  nodes:Node[];
  edges:Edge[];

  constructor() {
    this.edges = [];
    this.nodes = [];
    //let e:Edge = {source:"first", target:"second"};
    //this.edges.push(e)
  }

  ngOnChanges(): void {
    let g = new Grafo(this.estudante);
    g.criar().subscribe(matriz=>{
      let grafo = Grafo.construirGrafo(matriz);
      this.edges = grafo.arestas;
      this.nodes = grafo.nos;
    })
  }
}
