import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Turma from 'src/app/model/turma';
import { Util } from 'src/app/model/util';
import { ConhecimentoProgramacao } from 'src/app/model/enums/conhecimentoProgramacao';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css'],
})
export class ListarEstudantesComponent implements OnInit {
  estudantes$;
  selectedEstudante: Usuario;
  estudante: Usuario;
  turma;
  pageTracks;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.turma = new Turma(null, null, null, null);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['codigoTurma'] != null) {
        this.turma.codigo = params['codigoTurma'];
        /* this.buscarEstudante(params['codigoTurma']); */

        Turma.getAllEstudantes(params['codigoTurma']).subscribe((estudantes) => {
          this.estudantes$ = estudantes;

          /*  */
        });
      }
    });
  }

  getConhecimento(conhecimento){
    if(conhecimento == ConhecimentoProgramacao.medio){
      return "Sei algumas coisas, já escrevi pequenos programas"
    }else if(conhecimento == ConhecimentoProgramacao.programador){
      return "Eu sei programar"
    }else if(conhecimento == ConhecimentoProgramacao.nenhum){
      return "Nunca programei"
    }else{
      return 'Pouco, li algumas coisas, mas não sei programar'
    }
  }

  abrirMslq(){
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['admin', 'visualizar-mslq', this.turma.codigo] } },
    ]);
  }

  /* buscarEstudante(codigoTurma) {
    Usuario.getAllEstudantesByTurma(codigoTurma).subscribe((estudantes) => {
      this.estudantes = estudantes;
    });
  } */

  /* deleteEstudante(estudante: Usuario) {
    Usuario.delete(estudante.pk()).subscribe((resultado) => {
      Usuario.getAll().subscribe((estudantes) => {
        this.estudantes = estudantes;
      });
      this.messageService.add({
        severity: 'info',
        summary: 'Estudante deletado',
        detail: estudante.nome,
      });
    });
  } */

  abrirPerfilEstudante(estudante) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['turma', 'visualizacao-estudante', estudante.pk()] } },
    ]);
  }

  cadastrarEstudante() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['cadastro-estudante', this.turma.codigo] } },
      ]);
    }
  }

  visualizarEstatisticas() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['analytics-turma', this.turma.codigo] } },
      ]);
    }
  }

  exportarAnalytics() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['exportar-dados', this.turma.codigo] } },
      ]);
    }
  }
}
