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
  constructor(private messageService: MessageService,private rotas:Router) { 
    
  }

  ngOnInit() {
   
    Questao.getAll().subscribe(questoes=>{this.questoes= questoes});

    this.items = [
    { label: 'Alterar', icon: 'fa fa-check', command: (event) => this.alterarQuestao(this.selectedQuestao) },
    { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) }
    ];

  }



  alterarQuestao(questao: Questao) {
    // this.messageService.add({ severity: 'info', summary: 'questao Selected', detail: questao.nomeCurto + ' - ' + questao.assuntoPrincipal });
    this.rotas.navigate(['/']);
  }

  deleteQuestao(questao:Questao) {
     Questao.delete(questao.pk()).subscribe(resultado=>{
       console.log(questao.pk());

       for(let i =0;i<this.questoes.length;i++){
        if(this.questoes[i].id== questao.pk()){
          this.questoes.splice(i,1)
          console.log(i);
        } 
      }
    });
  }
  
  
}