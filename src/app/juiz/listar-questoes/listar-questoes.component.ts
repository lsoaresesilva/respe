import { Component, OnInit, Input } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import TestCase from 'src/app/model/testCase';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-listar-questoes',
  templateUrl: './listar-questoes.component.html',
  styleUrls: ['./listar-questoes.component.css']
})
export class ListarQuestoesComponent implements OnInit  {
  
  @Input("assunto") assunto?;

  selectedQuestao: Questao;
  items: MenuItem[];
  usuario;

  constructor(private messageService: MessageService, private router:Router, private login:LoginService) { 
    
  }

  ngOnInit() {

    this.usuario = this.login.getUsuarioLogado();

    this.items = [
      { label: 'Alterar', icon: 'pi pi-check', command: (event) => this.alterar(this.selectedQuestao) },
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedQuestao) }
      ];
  }

  abrirEditor(questao){
    this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(), questao.id] }}]);
  }

  responder(questao){
    this.router.navigate(["main", { outlets: { principal: ['monitoramento',this.assunto.pk(), questao.id] }}]);
  }

  alterar(questao: Questao) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['cadastro-questao', this.assunto.pk(),questao.id] } } ] );
    }
    
  }
 

  // deletar(questao:Questao){
  //   let index = -1;
  //   for (let i=0;i<this.assunto.questoesProgramacao;i++){
  //    if( this.assunto.questoesProgramacao[i].id== questao.id){
  //     index = i;
  //     break;
      
  //    }
  //   }
  //   this.assunto.questoesProgramacao.splice(index, 1);
  //   this.messageDelete();
    
  // }


  deletar(questao:Questao){
    let index = -1;
    for (let i=0;i<this.assunto.questoesProgramacao;i++){
     if( this.assunto.questoeProgramacao[i].id== questao.id){
      index = i;
      break;
      
     }
    }

    Assunto.delete(this.assunto.questoesProgramacao[index]).subscribe(resultado=>{
     
      this.messageDelete();
    });
    // this.assunto.questoesProgramacao.splice(index, 1);
    // this.messageDelete();
  }

  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  
}