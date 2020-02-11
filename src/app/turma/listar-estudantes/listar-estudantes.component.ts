import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css']
})
export class ListarEstudantesComponent implements OnInit {
  estudantes: Usuario[];
  selectedEstudante: Usuario;
  estudante: Usuario;
  turma;

  constructor(private route: ActivatedRoute, private router:Router, private messageService: MessageService) {
    this.estudantes = [];
    this.turma = new Turma(null, null, null, null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      if(params['codigoTurma'] != null){
        this.turma.codigo = params['codigoTurma'];
        this.buscarEstudante(params['codigoTurma'])
      }else{ /** Significa que é uma listagem geral de estudantes. */
        Usuario.getAll(new Query("perfil", "==", PerfilUsuario.estudante)).subscribe(estudantes=>{
          this.estudantes = estudantes;
        })
      }

    });
  }

  buscarEstudante(codigoTurma) {
    Usuario.getAllEstudantesByTurma(codigoTurma).subscribe(estudantes=>{
      this.estudantes = estudantes;
    })
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
    if(this.turma != null && this.turma.codigo != null)
      this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante', this.turma.codigo] } }]);
  }
}
