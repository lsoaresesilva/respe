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
  selectedEstudante: Usuario;
  items: MenuItem[];
  estudante: Estudante;
  id: Estudante;



  constructor(public router: Router, private messageService: MessageService) {

  }

  ngOnInit() {

   Usuario.getAll().subscribe(estudante => { this.estudantes = estudante, console.log(this.estudantes) });



    this.items = [
      
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
      { label: 'Alterar', icon: '°', command: (event) => this.alterar(this.selectedEstudante) }
    ];
  }
  abrirPerfilEstudante(estudante : Estudante) {
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-estudante', estudante.pk()] } }]);
    
  }
  alterar(estudante: Usuario) {
    this.router.navigate(["main", { outlets: { principal: ['atualizacao-estudante', estudante.pk()] } }]);
  }

  cadastrarEstudante() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante'] } }]);
  }

  deleteEstudante(estudante: Usuario) {
    
    Usuario.delete(estudante.pk()).subscribe(resultado => {
      Usuario.getAll().subscribe(estudantes=>{
        resultado = estudantes;
      });
      this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome });
    }); 

    
  }
}
