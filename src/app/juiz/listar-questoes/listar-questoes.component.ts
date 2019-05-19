import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import TestCase from 'src/app/model/testCase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-questoes',
  templateUrl: './listar-questoes.component.html',
  styleUrls: ['./listar-questoes.component.css']
})
export class ListarQuestoesComponent implements OnInit  {

  
  questoes;
  selectedQuestao: Questao;
  selectQuestoes: Questao[];
  items: MenuItem[];
  minhasQuestions;
  constructor(private messageService: MessageService,private router:Router) { 
    
  }

  ngOnInit() {
   
    Questao.getAll().subscribe(questoes=>{this.questoes= questoes});

    this.items = [
      { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterarQuestao(this.selectedQuestao) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) },
      { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedQuestao) }
      ];

  }

  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao'] } }]);
  }

  alterarQuestao(questao: Questao) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.pk()] } } ] );
    }
    
  }

  deleteQuestao(questao:Questao) {
     Questao.delete(questao.pk()).subscribe(resultado=>{
      
      Questao.getAll().subscribe(questoes=>{this.questoes= questoes});
       
    });
  }

  viewQuestao(questao:Questao) {
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-questao', questao.pk()] } } ] );
    this.messageView();
  }
  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  
}