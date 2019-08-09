import { Component, OnInit } from '@angular/core';
import Estudante from 'src/app/model/estudante';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';
import EstudanteTurma from 'src/app/model/estudanteTurma';

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


  constructor(private route: ActivatedRoute, private router:Router, private messageService: MessageService) {
    this.estudantes = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buscarEstudante(params['turmaId'])

    });

    this.items = [
      
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
      { label: 'Alterar', icon: '°', command: (event) => this.alterar(this.selectedEstudante) }
    ];
  

  }

  buscarEstudante(turmaId) {

    Usuario.getAll(new Query("perfil", "==", PerfilUsuario.estudante)).subscribe(estudantes=>{
      EstudanteTurma.getAll(new Query("turmaId", "==", turmaId)).subscribe(estudantesTurma => {

        for(let i = 0; i < estudantes.length; i++){
          for (let j = 0; j < estudantesTurma.length; j++) {
            
            if(estudantes[i].id == estudantesTurma[j].estudanteId){
              this.estudantes.push(estudantes[i]);
            }
    
          }
        }
        
      });
    });

    
  }

  deleteEstudante(estudante: Usuario) {

    
      Usuario.delete(estudante.pk()).subscribe(resultado => {
        Usuario.getAll().subscribe(estudantes=>{
          this.estudantes = estudantes;
        });
        this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome });
      }); 
  
      
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
}
