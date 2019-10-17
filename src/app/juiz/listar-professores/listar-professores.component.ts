import { Component, OnInit } from '@angular/core';
import Usuario from 'src/app/model/usuario';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import Turma from 'src/app/model/turma';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';
import Query from 'src/app/model/firestore/query';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-listar-professores',
  templateUrl: './listar-professores.component.html',
  styleUrls: ['./listar-professores.component.css']
})
export class ListarProfessoresComponent implements OnInit {

  professores = [];
  selectedProfessor: Usuario;
  items: MenuItem[];
  usuario;
  
  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { 
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {
   
    Usuario.getAll(new Query("perfil", "==", 2)).subscribe(professores=>{this.professores = professores});
    
    if(this.usuario.perfil == 3){
    this.items = [
    { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedProfessor) },
  
    ];
    }
    

  }


  deletar(professor: Usuario) {
     Usuario.delete(professor.pk()).subscribe(resultado=>{
      Usuario.getAll().subscribe(professor=>{this.professores= professor});
      this.messageDeletar();
    });
  }  

  
  messageDeletar() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:"Esse professor foi apagado!"});
  }

}

