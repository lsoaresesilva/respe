import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';

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
    Assunto.getAll().subscribe((assuntos) => {
      this.assuntos = Assunto.ordenar(assuntos);
    });
  }

  abrirAssunto(assunto) {
    this.router.navigate([
      'main',
      { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } },
    ]);
  }

  registrar() {
    this.router.navigate(['main', { outlets: { principal: ['codigo-similar'] } }]);
  }
}
