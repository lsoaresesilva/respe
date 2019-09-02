import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';
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
  exibirMensagemCodigoInvalido() {
    this.messageService.add({ severity: 'success', summary: 'É preciso informar o código de uma turma.' });
  }

  ngOnInit() {
    this.estudante = new Estudante(new Turma(null, null, null, null), new Usuario(null, null, null, PerfilUsuario.estudante));
  }

  cadastrarEstudante() {
    if(this.estudante.turma.codigo == undefined){
      this.exibirMensagemCodigoInvalido();
    }
    this.estudante.usuario.validar().subscribe(resultado => {
      if (resultado) {
        this.exibirMensagemCadastro();
        this.estudante.save().subscribe(resultado => {
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

