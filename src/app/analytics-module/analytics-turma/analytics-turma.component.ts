import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import Analytics from '../../model/analytics/analytics';
import Turma from '../../model/turma';

=======
import Analytics from 'src/app/model/analytics/analytics';
import Turma from 'src/app/model/turma';
>>>>>>> bc14f6a9e419d4632749b2d4dde2c9dff799634e

@Component({
  selector: 'app-analytics-turma',
  templateUrl: './analytics-turma.component.html',
  styleUrls: ['./analytics-turma.component.css'],
})
export class AnalyticsTurmaComponent implements OnInit {

  analytics$;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if (params['codigoTurma'] != null) {

          Turma.getAllEstudantes(params['codigoTurma']).subscribe(estudantes=>{
            let consultaRespostas = {};

            Analytics.getAnalyticsTurma(estudantes).subscribe(analytics=>{
              this.analytics$ = analytics;
            })
          })
      }
    });
  }
}
