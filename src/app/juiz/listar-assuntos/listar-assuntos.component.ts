import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';

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
      this.assuntos = assuntos;
      let usuario = this.login.getUsuarioLogado();
      if(usuario.grupoExperimento != Groups.control){
        this.assuntos.forEach((assunto) => {
          Assunto.calcularPercentualConclusao(assunto, this.login.getUsuarioLogado()).subscribe((percentual) => {
            assunto['percentual'] = percentual;
          });
        });
      }
      

      Assunto.ordenar(this.assuntos);
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
