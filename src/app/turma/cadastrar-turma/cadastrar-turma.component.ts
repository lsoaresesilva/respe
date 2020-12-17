import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';

import { MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import Query from 'src/app/model/firestore/query';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cadastrar-turma',
  templateUrl: './cadastrar-turma.component.html',
  styleUrls: ['./cadastrar-turma.component.css']
})
export class CadastrarTurmaComponent implements OnInit {

  turma: Turma;
  estudantes;
  professor;
  professores: Usuario[];

  constructor(public router: Router, private messageService: MessageService, private route: ActivatedRoute, private login: LoginService) {

  }

  ngOnInit() {
    this.turma = new Turma(null, null, [], null);
    this.professor = new Usuario(null, null, null);
    this.estudantes = [];

  }


  searchP(event) {
   /* Usuario.getAll(new Query("perfil", "==", 2)).subscribe(professores => {
      this.professores = [];
        professores.filter(professor => {
          if (professor.email != undefined && typeof professor.email === "string") {
            if (professor.email.includes(event.query)) {
              this.professores.push(professor);
            }
          }else{
            this.exibirMensagemProfessorAdicionado();
          }
        });

      return this.professores;
    });*/
  }

  exibirMensagemCadastroSucesso() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Salvo com sucesso.' });
  }

  exibirMensagemErroCadastro() {
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'É preciso informar o nome e um professor para a turma.' });
  }

  exibirMensagemErroCadastroBancoDeDados() {
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'Houve um erro ao tentar salvar no banco de dados. Tente novamente em alguns minutos.' });
  }
  exibirMensagemProfessorAdicionado(){
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'Houve um erro em adicionar o professo.' });
  }




  vizualizarProf(professor: Usuario) {
    this.messageService.add({ severity: 'info', summary: 'Professor selecionado', detail: professor.nome + ' - ' + professor.email });

  }


  adicionarProfessor() {
    this.turma.professor = this.professor;
  }


  excluirProfessor() {
    this.turma.professor = null;
  }

  cadastrarTurma() {
    if (this.turma.validar()) {
      this.exibirMensagemCadastroSucesso();
      this.turma.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-turma'] } }]);
      },
        err => {
          this.exibirMensagemErroCadastroBancoDeDados();
        });

    }else{
      this.exibirMensagemErroCadastro();
    }

  }


}