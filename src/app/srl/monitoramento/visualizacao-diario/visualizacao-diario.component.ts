
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import Diario from 'src/app/model/srl/diario';

@Component({
  selector: 'app-visualizacao-diario',
  templateUrl: './visualizacao-diario.component.html',
  styleUrls: ['./visualizacao-diario.component.css']
})
export class VisualizacaoDiarioComponent implements OnInit {

  diario;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      
      if (params['id'] != null) {
          Diario.get(params['id']).subscribe(diario=>{
            this.diario = diario;
          })
      }
    });
  }

}
