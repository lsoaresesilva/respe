import { Component, OnInit } from '@angular/core';
import { ModeloRespostaQuestao } from 'src/app/model/modeloRespostaQuestao';
import { LoginService } from 'src/app/login-module/login.service';
import { VisualizacaoRespostasQuestoes } from 'src/app/model/visualizacaoRespostasQuestoes';
import Query from 'src/app/model/firestore/query';
import { Questao } from 'src/app/model/questao';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-exibir-solucao',
  templateUrl: './exibir-solucao.component.html',
  styleUrls: ['./exibir-solucao.component.css']
})
export class ExibirSolucaoComponent implements OnInit {
 
  visualizacao;
  questaoId;
  modelo:ModeloRespostaQuestao;
  


  constructor( private login:LoginService,private route: ActivatedRoute,private messageService: MessageService) {  




    this.visualizacao = new VisualizacaoRespostasQuestoes(null,login.getUsuarioLogado(),this.modelo);

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => { this.questaoId = params["questaoId"] });

    //função get de modelo questão não está funcionando
    
    ModeloRespostaQuestao.getAll(new Query ("questaoId", "==",this.questaoId)).subscribe(modelo =>{
     
      if(modelo.length === 0){
        this.modelo = new ModeloRespostaQuestao(null,"Sem código disponível",null);
        this.exibirMensagem();
      }else{
      this.modelo[0] = modelo;
      this.visualizacao.save().subscribe(resultado => {});
      }
    
    });

    
      

  }
  exibirMensagem() {
    this.messageService.add({ severity: 'warning', summary: 'Sem código disponível' });
  }


}
