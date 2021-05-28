import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Postagem from 'src/app/model/cscl/postagem';
import { LoginService } from 'src/app/login-module/login.service';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.css'],
})
export class CadastrarPostagemComponent implements OnInit {
  postagem;
  postagemId;
  turma;

  isAlterar;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private login: LoginService
  ) {
    this.isAlterar = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params['codigoTurma'] != null){
        this.turma = new Turma(null, null, null, null);
        this.turma.codigo = params['codigoTurma'];
        this.postagemId = params['postagemId'];
        this.postagem = new Postagem(null, null, null, this.login.getUsuarioLogado(), this.turma);
        if (this.postagemId != undefined) {
          this.isAlterar = true;
          Postagem.get(this.postagemId).subscribe((resultado) => {
            this.postagem = resultado;
          });
        }
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não é possível realizar uma publicação sem informar a turma.',
        });
      }
      
    });
  }

  messageCadastro() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cadastrado!',
      detail: this.postagem.nome + '  foi adicionado',
    });
  }

  messageUpdate() {
    this.messageService.add({
      severity: 'success',
      summary: 'Alterado!',
      detail: ' assunto alterado',
    });
  }

  messageErro() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Falha ao publicar postagem',
      detail: 'O assunto não foi cadastrado',
    });
  }

  messageInformarDados() {
    this.messageService.add({
      severity: 'error',
      summary: 'Falha ao publicar postagem',
      detail: 'É preciso informar todos os campos do formulário',
    });
  }

  cadastrar() {
    if (this.postagem.validar()) {

      
      this.postagem.save().subscribe(
        (resultado) => {
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['turma', 'visualizacao-turma', this.turma.codigo] } },
          ]);
          this.messageCadastro();
        },
        (err) => {
          this.messageErro();
        }
      );
    } else {
      this.messageInformarDados();
    }
  }
}
