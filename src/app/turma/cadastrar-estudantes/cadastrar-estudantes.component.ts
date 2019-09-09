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

  exibirMensagemCadastro() {
    this.messageService.add({ severity: 'success', summary: 'Estudante cadastrado com sucesso.' });
  }

  ngOnInit() {
    this.estudante = new Estudante(new Turma(null, null, null, null), new Usuario(null, null, null, PerfilUsuario.estudante));
    this.route.params.subscribe(parametros=>{
      if(parametros["codigoTurma"] != undefined){
        this.estudante.turma.codigo = parametros["codigoTurma"];
      }
    })
  }

  cadastrarEstudante() {
    if(this.estudante.turma.codigo == undefined){
      alert("É preciso informar o código de uma turma.")
    }
    this.estudante.usuario.validar().subscribe(resultado => {
      if (resultado) {
        
        this.estudante.save().subscribe(resultado => {
          //this.exibirMensagemCadastro(); <= não está funcionando
          alert("Cadastro realizado com sucesso.")
          this.router.navigate([""]);
        },
          err => {
            this.messageService.add({ severity: 'erro', summary: 'Houve um erro:', detail: err.toString() });
          });

      }
    }, err=>{
      alert('Houve um erro: '+err.toString());
    })

  }


}

