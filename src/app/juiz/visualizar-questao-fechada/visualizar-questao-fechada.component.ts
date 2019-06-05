import { Component, OnInit } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css']
})
export class VisualizarQuestaoFechadaComponent implements OnInit {
  



  private questao?;
  private id: number;
  private sub: any;
  private questoes = [];


  constructor(private route: ActivatedRoute, private router: Router) {
    this.questao = new QuestaoFechada(null, null, null, null, [], []);

  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['assuntoId'] != null && params['questaoId']) {
        this.id = params['id'];
        Assunto.get(params['assuntoId']).subscribe(assunto => {
          this.questao = assunto["getQuestao"](params['questaoId']);
          this.questoes.push(this.questao);

        });
      } else {
        throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  alterarQuestao(questao: QuestaoFechada) {
    if (questao != undefined) {
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.id] } }]);
    }
  }




}