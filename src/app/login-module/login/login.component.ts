import { Component, OnInit } from '@angular/core';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
// import {Experiment} from 'scientificxpjs/experiment'
import { MenuItem, MessageService } from 'primeng/api';
import Query from 'src/app/model/database/query';
import { Groups } from 'src/app/model/experimento/groups';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario:Usuario;
  items: MenuItem[];
  loading;
  blocked: boolean;

  constructor(
    private router: Router,
    private login: LoginService,
    private messageService: MessageService
  ) {
    this.loading = false;
    this.items = [
      {
        label: 'Quero aprender a programar',
        url: 'http://www.32bits.codes:2368/',
      },
    ];

    this.usuario = new Usuario(null, "", null, null, null);
  }

  ngOnInit() {
    
  }

  async acessar() {
    if (!this.usuario.validarLogin()) {
      this.messageService.add({
        key: 'loginToast',
        severity: 'error',
        summary: 'Atenção',
        detail: 'É preciso preencher usuário e senha.',
      });
    } else {
      this.loading = true;
      try{
        await this.login.logar(this.usuario);
        this.redirecionar();
      }catch(err) {
        err = typeof err === 'function' ? err() : err;
        this.messageService.add({
          severity: 'error',
          summary: 'Houve um erro',
          detail: 'Não foi possível realizar o login: '+ err.message,
        });
        this.loading = false;
      }
    }
  }

  async redirecionar() {
    
      const usuario = this.login.getUsuarioLogado();
      if (usuario.perfil == PerfilUsuario.estudante) {
        if (usuario.grupoExperimento == Groups.control) {
          this.router.navigate(['geral/main', { outlets: { principal: ['juiz','listar-assuntos'] } }]);
        } else {
          this.router.navigate(['geral/main', { outlets: { principal: ['srl', 'index'] } }]);
        }
      } else if (usuario.perfil == PerfilUsuario.professor) {
        this.router.navigate(['geral/main', { outlets: { principal: ['turma', 'listar-turmas'] } }]);
      } else if (usuario.perfil == PerfilUsuario.admin) {
        this.router.navigate(['geral/main', { outlets: { principal: ['admin', 'listar-assuntos-admin'] } }]);
      }
    
  }

  cadastrar() {
    this.router.navigate(['cadastro-estudante']);
  }

  
}
