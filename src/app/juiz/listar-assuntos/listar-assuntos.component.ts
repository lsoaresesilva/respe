import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
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
  
  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {
   
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos});
    

    this.items = [
    { label: 'Alterar', icon: 'pi pi-check', command: (event) => this.alterar(this.selectedAssunto) },
    { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedAssunto) },
  
    ];

  }
  
  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-assunto'] } }]);
  }

  abrirAssunto(assunto){
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } } ] );
  }

  alterar(assunto: Assunto) {
    if(assunto != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-assunto', assunto.pk()] } } ] );
    }
    
  }

  deletar(assunto:Assunto) {
     Assunto.delete(assunto.pk()).subscribe(resultado=>{
      
      Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});
      this.messageDeletar();
    });
  }  

  
  messageDeletar() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:"Esse assunto foi apagado!"});
  }
 
}