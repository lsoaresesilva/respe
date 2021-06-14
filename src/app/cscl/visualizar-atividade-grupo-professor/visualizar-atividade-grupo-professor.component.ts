import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import { Groups } from 'src/app/model/experimento/groups';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-atividade-grupo-professor',
  templateUrl: './visualizar-atividade-grupo-professor.component.html',
  styleUrls: ['./visualizar-atividade-grupo-professor.component.css'],
})
export class VisualizarAtividadeGrupoProfessorComponent implements OnInit {
  atividadeGrupo: AtividadeGrupo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] != null) {
        AtividadeGrupo.get(params['id']).subscribe((atividadeGrupo) => {
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
          this.carregarEstudantes();
        });
      }
    });
  }

  carregarEstudantes() {
    if (Array.isArray(this.atividadeGrupo.estudantes)) {
      let consultaEstudantes = [];
      this.atividadeGrupo.estudantes.forEach((estudante) => {
        consultaEstudantes.push(Usuario.get(estudante.pk()));
      });

      forkJoin(consultaEstudantes).subscribe((estudantes) => {
        this.atividadeGrupo.grupos.forEach((grupo, indexGrupo) => {
          grupo.estudantes.forEach((estudante, index) => {
            let e = estudantes.find(function (est) {
              if (est['pk']() == estudante) {
                return true;
              }
            });

            if (e != null) {
              this.atividadeGrupo.grupos[indexGrupo].estudantes[index] = e as any;
            }
          });
        });
      });
    }
  }

  abrirSolucoesAtividadeGrupo(grupo: Grupo) {
    this.router.navigate([
      'geral/main',
      {
        outlets: {
          principal: [
            'cscl',
            'visualizacao-solucao-atividade-grupo',
            this.atividadeGrupo.pk(),
            grupo.id,
          ],
        },
      },
    ]);
  }

  gerarLink(grupo: Grupo) {
    if (grupo.estudantes.length > 0) {
      return this.atividadeGrupo.gerarLink(
        new Usuario(grupo.estudantes[0], '', '', PerfilUsuario.estudante, Groups.experimentalA, '')
      );
    }
  }

  excluir(grupo: Grupo) {
    for (let i = 0; i < this.atividadeGrupo.grupos.length; i++) {
      if (this.atividadeGrupo.grupos[i].id == grupo.id) {
        this.atividadeGrupo.grupos.splice(i, 1);
      }
    }

    this.atividadeGrupo.save().subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Operação realizada com sucesso',
        detail: 'Grupo atualizado',
      });
    });
  }

  criarGrupo(){
    this.router.navigate(["geral/main", { outlets: { principal: ['cscl', 'criar-grupo', this.atividadeGrupo.pk()] } }]);
  }
}
