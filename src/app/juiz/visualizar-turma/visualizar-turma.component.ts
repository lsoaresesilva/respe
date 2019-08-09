
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Turma from 'src/app/model/turma';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  turma;

  constructor(private route:ActivatedRoute){
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      Turma.get(params["turmaId"]).subscribe(turma=>{
        this.turma = turma;
      })

    });

  }

  
}