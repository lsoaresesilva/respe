import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css']
})
export class ListarEstudantesComponent implements OnInit {
  estudantes: Estudante[];
  selectedEstudante: Usuario;
  estudante: Estudante;
  id: Estudante;
  turma:Turma;

  constructor(private route: ActivatedRoute, private router:Router, private messageService: MessageService) {
    this.estudantes = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.turma = new Turma(null, null, null, null);
      this.turma.codigo = params['codigoTurma']
      this.buscarEstudante(this.turma)

    });
  }

  buscarEstudante(turma) {

    Usuario.getAll(new Query("perfil", "==", PerfilUsuario.estudante)).subscribe(estudantes=>{
      EstudanteTurma.getAll(new Query("turmaId", "==", turma.codigo)).subscribe(estudantesTurma => {

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

  abrirPerfilEstudante(estudante) {
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-estudante', estudante.pk()] } }]);
  }

  cadastrarEstudante() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante', this.turma.codigo] } }]);
  }
}
