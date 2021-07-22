import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import Query from 'src/app/model/firestore/query';
import Grafo from 'src/app/model/modelagem/grafo';

@Component({
  selector: 'app-grafo-estudantes',
  templateUrl: './grafo-estudantes.component.html',
  styleUrls: ['./grafo-estudantes.component.css'],
})
export class GrafoEstudantesComponent implements OnChanges {
  @Input()
  pageTracks;

  grafo;
  nodes: Node[];
  edges: Edge[];

  zoomToFit$: Subject<boolean> = new Subject();

  link;

  @ViewChild('markov')
  markov;

  constructor() {
    this.edges = [];
    this.nodes = [];
    //let e:Edge = {source:"first", target:"second"};
    //this.edges.push(e)
  }

  ngOnChanges(): void {

    function replacer(key, value) {
      if(value instanceof Map) {

        let objeto = {}

        value.forEach((value, key)=>{
          objeto[key] = value;
        })

        
        return objeto;
      } else {
        return value;
      }
    }

    

    if (this.pageTracks != null) {
      let g = new Grafo(this.pageTracks);
      /* let matriz = g.criarMatrizSomada(this.pageTracks); */
      let matriz = g.criar();
      this.grafo = Grafo.construirGrafo(matriz);
      this.edges = this.grafo.arestas;
      this.nodes = this.grafo.nos;
      this.zoomToFit$.next(true);
    }
  }

  gerarScreenshot() {
    html2canvas(this.markov.chart.nativeElement, { scrollY: -window.scrollY }).then((canvas) => {
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      a.download = 'somefilename.jpg';
      a.click();
    });
  }
}
