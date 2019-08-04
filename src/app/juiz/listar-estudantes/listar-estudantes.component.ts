import { Component, OnInit } from '@angular/core';
import Estudante from 'src/app/model/estudante';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css']
})
export class ListarEstudantesComponent implements OnInit {
  estudantes: Estudante[];
  selectedEstudante: Estudante;
  items: MenuItem[];
  estudante: Estudante;
  id: Estudante;



  constructor(public router: Router, private messageService: MessageService) {

  }

  ngOnInit() {

   Usuario.getAll().subscribe(estudante => { this.estudantes = estudante, console.log(this.estudantes) });



    this.items = [
      
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
      { label: 'Alterar', icon: '°', command: (event) => this.atualizar(this.selectedEstudante) }
    ];
  }
  abrirPerfilEstudante(estudante : Estudante) {
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-estudante', estudante.pk()] } }]);
    
  }
  atualizar(estudante: Estudante) {
    this.router.navigate(["main", { outlets: { principal: ['atualizacao-estudante', estudante.pk()] } }]);
  }

  cadastrar() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante'] } }]);
  }

  deleteEstudante(estudante: Estudante) {
    
    Estudante.delete(estudante.pk()).subscribe(resultado => {
      Estudante.getAll().subscribe(estudantes=>{
        this.estudantes = estudantes;
      })
      this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome });
    }); 

    
  }
}
