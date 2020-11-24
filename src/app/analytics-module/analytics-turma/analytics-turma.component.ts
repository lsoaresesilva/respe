import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Analytics from 'src/app/model/analytics/analytics';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-analytics-turma',
  templateUrl: './analytics-turma.component.html',
  styleUrls: ['./analytics-turma.component.css'],
})
export class AnalyticsTurmaComponent implements OnInit {
  estudantes$;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Recuperar todos os estudantes da turma
    // Recuperar as respostas que eles deram para as questões
    // Verificar da data atual para 7 dias atrás aqueles que não tem nenhuma
    this.route.params.subscribe((params) => {
      if (params['turmaId'] != null) {
        Turma.getByQuery(new Query('codigo', '==', params['turmaId'])).subscribe((turma: Turma) => {
          this.estudantes$ = Analytics.calcularNumeroAtividadesTrabalhadasPorSemana(turma);
        });
      }
    });
  }
}
