import { Component, OnInit } from '@angular/core';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
// import {Experiment} from 'scientificxpjs/experiment'
import { MessageService } from 'primeng/api';
import Query from 'src/app/model/firestore/query';
import { Groups } from 'src/app/model/experimento/groups';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private router: Router,
    private login: LoginService,
    private messageService: MessageService
  ) {
    this.usuario = new Usuario(null, null, null, 0, null);
  }

  ngOnInit() {}

  acessar() {
    if (!this.usuario.validarLogin()) {
      this.messageService.add({
        key: 'loginToast',
        severity: 'error',
        summary: 'Houve um erro:',
        detail: 'Você não preencheu o usuário ou senha.',
      });
    } else {
      this.login.logar(this.usuario).subscribe((resultado) => {
        // Iniciar timer

        this.redirecionar(resultado);
      });
    }
  }

  redirecionar(resultado) {
    if (resultado) {
      const usuario = this.login.getUsuarioLogado();
      if (usuario.perfil == PerfilUsuario.estudante) {
        if (usuario.grupoExperimento == Groups.control) {
          this.router.navigate(['main', { outlets: { principal: ['listagem-assuntos'] } }]);
        } else {
          this.router.navigate(['main', { outlets: { principal: ['meu-desempenho'] } }]);
        }
      } else if (usuario.perfil == PerfilUsuario.professor) {
        this.router.navigate(['main', { outlets: { principal: ['listagem-turmas'] } }]);
      } else if (usuario.perfil == PerfilUsuario.admin) {
        this.router.navigate(['main']);
      }
    } else {
      this.messageService.add({
        key: 'loginToast',
        severity: 'error',
        summary: 'Houve um erro:',
        detail: 'Usuário ou senha inválidos.',
      });
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
