import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
import Analytics from 'src/app/model/analytics/analytics';
import Submissao from 'src/app/model/submissao';

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
        Turma.getByQuery(new Query('codigo', '==', this.turma.codigo)).subscribe((turma: Turma) => {
          Analytics.calcularNumeroAtividadesTrabalhadasPorSemana(turma).subscribe((estudantes) => {
            this.estudantes$ = estudantes;
            this.estudantes$.forEach((estudante) => {
              Submissao.getAll(new Query('estudanteId', '==', estudante.id)).subscribe(
                (submissoes) => {
                  estudante.totalRespostasProgramacao = submissoes.length;
                }
              );
            });
          });
        });
      } else {
        /** Significa que é uma listagem geral de estudantes. */
        /* Usuario.getAll(new Query('perfil', '==', PerfilUsuario.estudante)).subscribe(
          (estudantes) => {
            this.estudantes = estudantes;
          }
        ); */

        this.estudantes$ = Usuario.getAll(new Query('perfil', '==', PerfilUsuario.estudante));
      }
    });
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
      'main',
      { outlets: { principal: ['visualizacao-estudante', estudante.pk()] } },
    ]);
  }

  cadastrarEstudante() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['cadastro-estudante', this.turma.codigo] } },
      ]);
    }
  }

  visualizarEstatisticas() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['analytics-turma', this.turma.codigo] } },
      ]);
    }
  }
}
