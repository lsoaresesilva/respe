import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-atividade-grupo-controle',
  templateUrl: './atividade-grupo-controle.component.html',
  styleUrls: ['./atividade-grupo-controle.component.css'],
})
export class AtividadeGrupoControleComponent implements OnInit {
  atividadeGrupoId: any;
  atividadeGrupo: AtividadeGrupo;
  estudante: Usuario;
  grupo: Grupo;

  constructor(private route: ActivatedRoute, private login: LoginService, private router:Router) {
    this.estudante = this.login.getUsuarioLogado();

    this.route.params.subscribe((params) => {
      if (
        params['atividadeGrupoId'] != null
      ) {
        this.atividadeGrupoId = params['atividadeGrupoId'];
      }
    });
  }

  ngOnInit(): void {
    AtividadeGrupo.get(this.atividadeGrupoId).subscribe((atividadeGrupo) => {
      this.atividadeGrupo = atividadeGrupo;

      let grupo = this.atividadeGrupo.getGrupoByEstudante(this.estudante);

      if (grupo == null) {
        // Deve pegar um grupo já criado e verificar se há espaço nele.
        let grupoDisponivel = this.atividadeGrupo.getGrupoDisponivel();

        if (grupoDisponivel.length == 0) {
          this.atividadeGrupo.criarGrupo(this.estudante).subscribe((grupo) => {
            this.grupo = grupo;
            this.redirecionar();
          });
        } else {
          this.grupo = grupoDisponivel[0];
          this.atividadeGrupo.adicionarEstudante(this.estudante, grupoDisponivel[0]);
          this.atividadeGrupo.save().subscribe(() => {});
          this.redirecionar();
        }
      } else {
        this.grupo = grupo;
        this.redirecionar();
      }
    });
  }

  redirecionar(){

    // link = environment.URL_SERVIDOR + 'geral/main/(principal:juiz/atividade-grupo/';
    //  link += this.pk() + '/' +grupoEstudante.id+'/'+ this['assuntoId'] + '/' + this['questaoColaborativaId'] + ')';

    this.router.navigate([
      'geral/main',
      {
        outlets: {
          principal: [
            'juiz',
            'atividade-grupo',
            this.atividadeGrupoId,
            this.grupo.id,
            this.atividadeGrupo['assuntoId'],
            this.atividadeGrupo['questaoColaborativaId'],
          ],
        },
      },
    ]);
  }
}
