import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-listar-assuntos',
  templateUrl: './listar-assuntos.component.html',
  styleUrls: ['./listar-assuntos.component.css']
})
export class ListarAssuntosComponent implements OnInit {
  

  assuntos;
  selectedAssunto: Assunto;
  items: MenuItem[];
  
  constructor(private messageService: MessageService,private router:Router, public login:LoginService) { }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos});

    this.items = [
    { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterarAssunto(this.selectedAssunto) },
    { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteAssunto(this.selectedAssunto) },
    { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedAssunto) }
    ];

  }
  
  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-assunto'] } }]);
  }

  abrirAssunto(assunto){
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } } ] );
  }

  alterarAssunto(assunto: Assunto) {
    if(assunto != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-assunto', assunto.pk()] } } ] );
    }
    
  }

  deleteAssunto(assunto:Assunto) {
     Assunto.delete(assunto.pk()).subscribe(resultado=>{
      
      Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});
      this.messageDelete();
    });
  }  

  viewQuestao(assunto:Assunto) {
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } } ] );
    this.messageView();
  }
  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Assunto visualizado', detail:'informações sobre a questão'});
  }
}