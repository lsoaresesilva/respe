import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';

import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import Analytics from '../../model/analytics/analytics';
import ConfiguracaoEditor from '../../model/configuracoes/configuracaoEditor';
import { Groups } from '../../model/experimento/groups';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';
import Query from '../../model/database/query';
import { BreadcrumbService } from 'src/app/geral-module/breadcrumb.service';

@Component({
  selector: 'app-listar-assuntos',
  templateUrl: './listar-assuntos.component.html',
  styleUrls: ['./listar-assuntos.component.css'],
})
export class ListarAssuntosComponent implements OnInit {
  assuntos;
  usuario;
  loading: boolean = true; 

  constructor(private router: Router, public login: LoginService, private route: ActivatedRoute) {
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {

    Assunto.getAll([new Query("lazy", "=", true)]).subscribe((assuntos) => {
      if (this.usuario.grupoExperimento != Groups.control) {
        // Create an array of promises for calcularProgresso()
        const progressoPromises = assuntos.map(async (assunto) => {
          const percentual = await assunto.calcularProgresso();
          assunto.percentualConclusao = percentual;
          return assunto;
        });
  
        // Wait for all promises to resolve
        Promise.all(progressoPromises).then((resolvedAssuntos) => {
          this.assuntos = resolvedAssuntos; // Set the updated assuntos
          this.loading = false; // Hide the loading spinner
        });
      } else {
        this.assuntos = assuntos; // If not experimental, directly assign
        this.loading = false; // Hide the loading spinner
      }
    });

  }

 

  registrar() {
    this.router.navigate(['geral/main', { outlets: { principal: ['codigo-similar'] } }]);
  }
}
