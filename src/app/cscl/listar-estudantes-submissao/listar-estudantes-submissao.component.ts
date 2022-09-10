import { Component, OnInit, Input } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { Router, ActivatedRoute } from '@angular/router';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';


@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {

  submissoesDaQuestao;
  msgs = [{severity:'info', summary:'Precisando de ajuda?', detail:'Listamos abaixo algoritmos criados por outros estudantes e que estão implementados corretamente. Caso não consiga resolver a questão, utilize-os como aprendizado.'}]

  constructor(private router: Router, private route: ActivatedRoute, private login: LoginService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          let questao = assunto["getQuestaoProgramacaoById"](params["questaoId"]);

          // TODO: filtrar para listar apenas submissões de uma turma
          /* Submissao.getSubmissoesRecentesTodosUsuarios(questao, this.login.getUsuarioLogado()).subscribe(submissoes => {
            this.submissoesDaQuestao = submissoes
          }) */
        });

      } else {
        throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
      }

    });
  }


  /*BuscarEstudantePorSubmissao(submissoesQuestao = []) {
    console.log("buscarEstudante" + submissoesQuestao)
    for (let i = 0; i < submissoesQuestao.length; i++) {

      Usuario.get(submissoesQuestao[i].estudanteId).subscribe(resultado => {
        this.estudante = resultado;
        submissoesQuestao[i].estudante = this.estudante.nome;
      });
    }

    this.submissoesDaQuestao = submissoesQuestao;


  }

  eliminandosubmissoesRepetidas(todasSubmissoes = []) {
    console.log("eliminando submissoes repetidas" + todasSubmissoes)
    let submissoesSemRepeticao = [];

    todasSubmissoes.forEach(submissao => {
      let temRepeticao = submissoesSemRepeticao.findIndex(submissaoTratada => submissao.estudanteId ===
        submissaoTratada.estudanteId) !== -1;

      if (!temRepeticao) {
        submissoesSemRepeticao.push(submissao);
      }
    })
    this.BuscarEstudantePorSubmissao(submissoesSemRepeticao);
  }*/





  visualizarSubmissao(submissao) {
    this.router.navigate(["main", { outlets: { principal: ['visualizar-submissao-questao', submissao.id] } }]);
  }



}



