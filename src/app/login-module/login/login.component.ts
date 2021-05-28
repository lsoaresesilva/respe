import { Component, OnInit } from '@angular/core';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
// import {Experiment} from 'scientificxpjs/experiment'
import { MenuItem, MessageService } from 'primeng/api';
import Query from 'src/app/model/firestore/query';
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

    this.usuario = new Usuario(null, "", "", 0, null, null);
  }

  ngOnInit() {
    
  }

  acessar() {
    if (!this.usuario.validarLogin()) {
      this.messageService.add({
        key: 'loginToast',
        severity: 'error',
        summary: 'Houve um erro:',
        detail: 'Você não preencheu o usuário ou senha.',
      });
    } else {
      this.loading = true;
      this.login.logar(this.usuario).subscribe((resultado) => {
        // Iniciar timer

        this.redirecionar(resultado);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Houve um erro',
          detail: 'Não foi possível realizar o login: '+ err.toString(),
        });
        this.loading = false;
      });
    }
  }

  redirecionar(resultado) {
    if (resultado) {
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
  }

  cadastrar() {
    this.router.navigate(['cadastro-estudante']);
  }

  signInWithGoogle() {
    /* this.login.signInWithGoogle()
      .then((res) => {
        if (res != undefined) {
          Usuario.logar(new Query('email', "==", res.user.email)).subscribe(usuarioLogado => {
            if (usuarioLogado != undefined) {
              this.login.criarSessao(usuarioLogado);

              this.router.navigate(["main", { outlets: { principal: ['home'] } }]);
            } else {
              this.router.navigate(["cadastro-estudante", res.user.email, res.user.displayName])
            }
          }), err => {
            alert("erro ao tentar realizar login:" + err.string())
          }

        }
      })
      .catch((err) => console.log(err)); */
  }

  signInWithFacebook() {
    /* this.login.signInWithFacebook()
      .then((res) => {
        if (res != undefined) {
          Usuario.logar(new Query('email', "==", res.user.email)).subscribe(usuarioLogado => {
            if (usuarioLogado != undefined) {
              this.login.criarSessao(usuarioLogado);
              this.router.navigate(["main", { outlets: { principal: ['home'] } }]);
            } else {
              this.router.navigate(["cadastro-estudante", res.user.email, res.user.displayName])
            }
          }), err => {
            alert("erro ao tentar realizar login:" + err.string())
          }

        }
      })
      .catch((err) => console.log(err)); */
  }
}
