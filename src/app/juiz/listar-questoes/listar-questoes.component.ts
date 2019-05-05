import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-questoes',
  templateUrl: './listar-questoes.component.html',
  styleUrls: ['./listar-questoes.component.css']
})
export class ListarQuestoesComponent implements OnInit  {

  questoes;
  selectedQuestao: Questao;
  items: MenuItem[];
  
  constructor(private messageService: MessageService,private router:Router) { }

  ngOnInit() {
    Questao.getAll().subscribe(questoes=>{this.questoes= questoes});

    this.items = [
    { label: 'Update', icon: 'pi pi-check', command: (event) => this.updateQuestao(this.selectedQuestao) },
    { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) },
    { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedQuestao) }
    ];

  }

  updateQuestao(questao: Questao) {
    this.router.navigate(['/questao', questao.pk()]);
    
  }

  deleteQuestao(questao:Questao) {
    Questao.delete(questao.pk()).subscribe(resultado=>{
      console.log(questao.pk());
      this.messageDelete();

      for(let i =0;i<this.questoes.length;i++){
        if(this.questoes[i].id== questao.pk()){
          this.questoes.splice(i,1)
          console.log(i);
        } 
      }
    });
  }
                        
  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questão visualizada', detail:'informações sobre a questão'});
  }

  viewQuestao(questao:Questao) {
    this.messageView();
    this.router.navigate(['/Visualizar/Questao', questao.pk()]);
  }
 
}