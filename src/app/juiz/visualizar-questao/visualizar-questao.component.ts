import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import Submissao from 'src/app/model/submissao';
import { Menu } from 'primeng/primeng';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-visualizar-questao',
  templateUrl: './visualizar-questao.component.html',
  styleUrls: ['./visualizar-questao.component.css']
})
export class VisualizarQuestaoComponent implements OnInit {



  private questao?;
  private id: number;
  private sub: any;
  private questoes = [];


  constructor(private route: ActivatedRoute, private router: Router) {
    this.questao = new Questao(null, null, null, null, null, [], []);

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
  alterarQuestao(questao: Questao) {
    if (questao != undefined) {
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.id] } }]);
    }
  }




}