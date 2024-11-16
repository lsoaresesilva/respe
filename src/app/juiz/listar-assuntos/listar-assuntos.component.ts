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
import Query from '../../model/firestore/query';
import { BreadcrumbService } from 'src/app/geral-module/breadcrumb.service';

@Component({
  selector: 'app-listar-assuntos',
  templateUrl: './listar-assuntos.component.html',
  styleUrls: ['./listar-assuntos.component.css'],
})
export class ListarAssuntosComponent implements OnInit {
  assuntos;
  usuario;

  constructor(private router: Router, public login: LoginService, private route: ActivatedRoute) {
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {

    Assunto.getAll([new Query("lazy", "=", false)]).subscribe((assuntos) => {
      this.assuntos = assuntos;

      if (this.usuario.grupoExperimento != Groups.control) {
        this.assuntos.forEach((assunto) => {
          Assunto.consultarRespostasEstudante(this.usuario).subscribe(respostas => {
            let percentual = Analytics.calcularProgressoNoAssunto(assunto, respostas);
            assunto['percentual'] = percentual;
          })
        });
      }

    });

  }

 

  registrar() {
    this.router.navigate(['geral/main', { outlets: { principal: ['codigo-similar'] } }]);
  }
}
