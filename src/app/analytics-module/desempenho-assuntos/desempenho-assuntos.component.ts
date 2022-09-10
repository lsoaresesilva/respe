import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';

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

  constructor(private login: LoginService, private router: Router) {}

  ngAfterViewInit() {
    let usuario = null;
    if (this.usuarioId == null) {
      usuario = this.login.getUsuarioLogado();
    } else {
      usuario = new Usuario(this.usuarioId, null, null, null, null, null);
    }

    
  }

  abrirAssunto(assunto) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['juiz', 'visualizar-assunto', assunto.pk()] } },
    ]);
  }
}
