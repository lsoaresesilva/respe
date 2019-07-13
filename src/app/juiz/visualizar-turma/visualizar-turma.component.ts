
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Estudante from 'src/app/model/estudante';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';
import { MessageService, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  estudantes;
  items: MenuItem[];
  selectedEstudante: Usuario;

  constructor(private route: ActivatedRoute, private messageService: MessageService) {
    this.estudantes = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buscarEstudante(params['turmaId'])

    });

    this.items = [
      { label: 'Apagar ', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
     
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
  deleteEstudante(estudantes: Usuario) {
    
    Usuario.delete(estudantes.pk()).subscribe(resultado => {
      Usuario.getAll().subscribe(estudantes=>{
        this.estudantes = estudantes;
      })
      this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudantes.nome });
    }); 

    
  }
}