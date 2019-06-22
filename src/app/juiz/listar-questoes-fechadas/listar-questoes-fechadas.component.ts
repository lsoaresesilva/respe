import { Component, OnInit, Input } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from '../login.service';
import { Assunto } from 'src/app/model/assunto';

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
  assuntos;

  constructor(private messageService: MessageService, private router:Router, private login:LoginService) { 
    
  }

  ngOnInit() {
    this.usuario = this.login.getUsuarioLogado();
    this.items = [
      { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterar(this.selectedQuestao) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.delete(this.selectedQuestao) }
      ];
  }


  alterar(questao: QuestaoFechada) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao-fechada', questao.id] } } ] );
    }
  
  }
  visualizar(questao:QuestaoFechada){
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-questao-fechada',this.assunto.pk(), questao.id] } } ] );

  }

  delete(questao:QuestaoFechada) {
  //  for(let i =0;i<this.assunto.length;i++){
  //   if( this.assunto[i].questoesProgramacao.id==questao.id){
       
  //   }
  //  }
     /*Questao.delete(questao.pk()).subscribe(resultado=>{
      
      Questao.getAll().subscribe(questoes=>{this.questoes= questoes});
       
    });*/
  }

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