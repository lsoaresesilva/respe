
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Turma from 'src/app/model/turma';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  turma$?;

  constructor(private route:ActivatedRoute, private router:Router){
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.turma$ = Turma.get(params["turmaId"]);

    });

  }

  visualizarEstudantes(turma){
    this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes', turma.codigo] } }]);
  }

  
}