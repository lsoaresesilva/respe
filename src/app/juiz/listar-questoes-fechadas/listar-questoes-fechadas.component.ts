import { Component, OnInit, Input } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from '../login.service';
import { Assunto } from 'src/app/model/assunto';
import { RespostaQuestaoFechada } from 'src/app/model/respostaQuestaoFechada';
import Query from 'src/app/model/firestore/query';
import { Observable } from 'rxjs';
import Alternativa from 'src/app/model/alternativa';
import { Questao } from 'src/app/model/questao';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-listar-questoes-fechadas',
  templateUrl: './listar-questoes-fechadas.component.html',
  styleUrls: ['./listar-questoes-fechadas.component.css']
})
export class ListarQuestoesFechadasComponent implements OnInit {
  
  @Input("assunto") assunto?;

  selectedQuestao: QuestaoFechada;
  items: MenuItem[];
  usuario;
  questoes;
  respostas;
  

  

  constructor(private messageService: MessageService, private router:Router, private login:LoginService) { 
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {
    
    RespostaQuestaoFechada.getAll(new Query("usuarioId","==",this.usuario.pk())).subscribe(respostas => {
      this.respostas=respostas;
      this.adicionandoRespostaUsuario(this.assunto.questoesFechadas,this.respostas);

    });



    if(this.usuario.perfil == 3){
      this.items = [
        { label: 'Alterar', icon: 'pi pi-check', command: (event) => this.alterar(this.selectedQuestao) },
       // { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedQuestao) }
        ];
    }
  
  }


  
  
  
  visualizar(questao:QuestaoFechada){
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-questao-fechada',this.assunto.pk(), questao.id] } } ] );

  }


  alterar(questao: QuestaoFechada) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['cadastro-questao-fechada', this.assunto.pk(),questao.id] } } ] );
    }
    
  }


  adicionandoRespostaUsuario(questoes,respostasUsuario){


    questoes.map(questao =>{

      //Iniciando as respostas como não respondida
      questao.respostaUsuario = "responder";

      respostasUsuario.map(respostaUsuario=>{

        if( questao.id == respostaUsuario.questaoId ){
          let respostaCerta = Alternativa.EncontrarAlternativaCerta(questao.alternativas);

          //definindo a questao do usuario se a sua resposta foi certa ou errada
          questao.respostaUsuario = respostaUsuario.resposta === respostaCerta ? "Certo" : "Errado";
        }
          
      });

    });


    
    this.ordernarPorSequencia(questoes);
    
    
  }
 
  ordernarPorSequencia(questoes:QuestaoFechada[]){
    questoes.sort((a, b) => a.sequencia - b.sequencia);
    this.questoes= questoes;
  }
  

  // deletar(questao:QuestaoFechada){
  //   let index = -1;
  //   for (let i=0;i<this.assunto.questoesFechadas;i++){
  //    if( this.assunto.questoeFechadas[i].id== questao.id){
  //     index = i;
  //     break;
      
  //    }
  //   }

  //   Assunto.delete(this.assunto.questoesFechadas[index]).subscribe(resultado=>{
     
  //     this.messageDelete();
  //   });
  //   this.assunto.questoesFechadas.splice(index, 1);
  //   this.messageDelete();
  // }

  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao-fechada'] } }]);
  }
  
}