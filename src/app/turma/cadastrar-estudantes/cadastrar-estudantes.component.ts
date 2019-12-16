import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';


@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css']
})
export class CadastrarEstudantesComponent implements OnInit {

  id;
  estudante;

  constructor(public router: Router, private route: ActivatedRoute, private messageService: MessageService) {

  }
  MensagemError() {
    this.messageService.add({ severity: 'success', summary: 'Estudante cadastrado com sucesso.' });
  }

  exibirMensagemCadastro() {
    this.messageService.add({ severity: 'success', summary: 'Estudante cadastrado com sucesso.' });
  }
  exibirMensagemCodigoInvalido() {
    this.messageService.add({ severity: 'success', summary: 'É preciso informar o código de uma turma.' });
  }

  ngOnInit() {
    this.estudante = new Estudante(new Turma(null, null, null, null), new Usuario(null, null, null, PerfilUsuario.estudante, null));
    this.route.params.subscribe(parametros => {
      if (parametros["codigoTurma"] != undefined) {
        this.estudante.turma.codigo = parametros["codigoTurma"];
      }

      if(parametros["email"] && parametros["nome"] != undefined){
        this.estudante.usuario.nome = parametros["nome"];
        this.estudante.usuario.email = parametros["email"];
       
      }
    })
  }
  cadastrarEstudante() {
    if (this.estudante.turma.codigo == undefined) {
      alert("É preciso informar o código de uma turma.");
    }else{
      Turma.validarCodigo(this.estudante.turma.codigo).subscribe(resultado => {
        
        if (resultado === false) {
          
          this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: "Não existe uma turma cadastrada com este código." });
        } else {
          this.estudante.usuario.validar().subscribe(resultado => {
            if (resultado) {
  
              this.estudante.save().subscribe(resultado => {
                alert("Cadastro realizado com sucesso.")
                this.messageService.add({ severity: 'success', summary: 'Bem vindo!', detail: "Cadastro realizado com sucesso." });
                this.router.navigate([""]);
              },
                err => {
                  this.messageService.add({ severity: 'erro', summary: 'Houve um erro:', detail: err.toString() });
                });
  
            }
          }, err => {
            alert('Houve um erro: ' + err.toString());
          });
        }
      });
    }
    
  }




}

