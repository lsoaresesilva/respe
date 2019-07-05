import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import { ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {
  turmas: Turma[];
  turma;
  estudantes:Estudante [];
  estudante;
  Estudante;
  estudantesTurma = [];
  buscarEstudantes = [];
  id;
  sub: any;
  items: MenuItem[];
  selectEstudante: Estudante;
  selectedEstudante: Estudante;

  

  constructor(private route: ActivatedRoute,private messageService: MessageService) { 
    this.Estudante = new EstudanteTurma (null,null, null);
    this.turma = new Turma (null, null,null,null);
  }


  ngOnInit() {
    this.items = [
      
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deletar(this.selectEstudante) }
  ];
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      EstudanteTurma.getAll(new Query("turmaId", "==", this.id)).subscribe(estudantesTurma => {this.estudantesTurma = estudantesTurma});
      
      for (let i =0; i<this.estudantesTurma.length; i++){
 
        Usuario.get(this.estudantesTurma[i].estudanteId).subscribe(resultado => {this.estudante = resultado
  
        this.estudantesTurma[i].estudante = this.estudante.nome
        console.log (this.estudantesTurma );
        console.log (this.estudantesTurma );
      });
      }
    this.estudantesTurma = this.buscarEstudantes;
      });
    
    
  }
  buscarEstudante(estudantesTurma){
    
    for (let i =0; i<estudantesTurma.length; i++){
 
      Usuario.get(estudantesTurma[i].estudanteId).subscribe(resultado => {this.estudante = resultado

      estudantesTurma[i].estudante = this.estudante.nome
      console.log (estudantesTurma );
      console.log (this.estudantesTurma );
    });
    }
  estudantesTurma = this.buscarEstudantes;
  }
    
 
    deletar(estudante: Estudante){
      let index = -1;
      for (let i = 0; i < this.estudantesTurma.length; i++) {
          if (this.estudantesTurma[i].id == estudante.id) {
              index = i;
              break;
          }
      }
      this.estudantesTurma.splice(index, 1);
    
      this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome + ' - ' + estudante.id });
    }

    }
       
  
    
  

    

  

