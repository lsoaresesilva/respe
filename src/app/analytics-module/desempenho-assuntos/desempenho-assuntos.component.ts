import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { BreadcrumbService } from 'src/app/geral-module/breadcrumb.service';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';

@Component({
  selector: 'app-desempenho-assuntos',
  templateUrl: './desempenho-assuntos.component.html',
  styleUrls: ['./desempenho-assuntos.component.css'],
})
export class DesempenhoAssuntosComponent implements AfterViewInit {
  @Input()
  usuarioId;

  @Input()
  assuntos;

  constructor(private login: LoginService, private router: Router, private breadcrumbService: BreadcrumbService) {}

  ngAfterViewInit() {
    let usuario = null;
    if (this.usuarioId == null) {
      usuario = this.login.getUsuarioLogado();
    } else {
      usuario = Usuario.fabricar();
    }

    
  }

  abrirAssunto(assunto:Assunto) {

    this.breadcrumbService.adicionar({
      label: assunto.nome, routerLink: [
        '/geral/main',
        { outlets: { principal: ['juiz', 'visualizar-assunto', assunto.pk] } }
      ]
    });

    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['juiz', 'visualizar-assunto', assunto.pk] } },
    ]);
  }
}
