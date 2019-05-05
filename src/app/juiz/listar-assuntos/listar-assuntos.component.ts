import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Assunto } from 'src/app/model/assunto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-assuntos',
  templateUrl: './listar-assuntos.component.html',
  styleUrls: ['./listar-assuntos.component.css']
})
export class ListarAssuntosComponent implements OnInit {

  assuntos;
  selectedAssunto: Assunto;
  items: MenuItem[];
  
  constructor(private messageService: MessageService,private router:Router) { }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos});

    this.items = [
    { label: 'Update', icon: 'pi pi-check', command: (event) => this.updateQuestao(this.selectedAssunto) },
    { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedAssunto) },
    { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedAssunto) }
    ];

  }

  updateQuestao(assunto: Assunto) {
    this.router.navigate(['/assunto', assunto.pk()]);
    
  }

  deleteQuestao(assunto:Assunto) {
    Assunto.delete(assunto.pk()).subscribe(resultado=>{
      console.log("está sendo exluido esse"+assunto.pk());
       this.messageDelete();

      for(let i =0;i<this.assuntos.length;i++){
        if(this.assuntos[i].id== assunto.pk()){
          this.assuntos.splice(i,1)
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

  viewQuestao(assunto:Assunto) {
    this.messageView();
    this.router.navigate(['/Visualizar/Assunto', assunto.pk()]);
  }
 
}