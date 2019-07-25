import { Component, OnInit } from '@angular/core';
import { ModeloRespostaQuestao } from 'src/app/model/modeloRespostaQuestao';
import { LoginService } from 'src/app/juiz/login.service';
import { VisualizacaoRespostasQuestoes } from 'src/app/model/visualizacaoRespostasQuestoes';
import Query from 'src/app/model/firestore/query';
import { Questao } from 'src/app/model/questao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exibir-solucao',
  templateUrl: './exibir-solucao.component.html',
  styleUrls: ['./exibir-solucao.component.css']
})
export class ExibirSolucaoComponent implements OnInit {
 
  visualizacao;
  questaoId;
  modelo;
  


  constructor( private login:LoginService,private route: ActivatedRoute) {  




    this.visualizacao = new VisualizacaoRespostasQuestoes(null,login.getUsuarioLogado(),this.modelo);

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => { this.questaoId = params["questaoId"] });

    //função get de modelo questão não está funcionando
    ModeloRespostaQuestao.get(new Query ("questaoId", "==",this.questaoId)).subscribe(modelo =>{this.modelo = modelo});

    this.visualizacao.save().subscribe(resultado => {});
      

  }

}
