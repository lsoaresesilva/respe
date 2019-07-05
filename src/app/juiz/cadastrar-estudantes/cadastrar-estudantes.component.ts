import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Estudante from 'src/app/model/estudante';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';

@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css']
})
export class CadastrarEstudantesComponent implements OnInit {

  id;
  estudante;
  isAtualizacao;
  estudantes = [];

  constructor(public router: Router, private messageService: MessageService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.estudante = new Estudante(null, null, new Usuario(null, null, null, PerfilUsuario.estudante));
    if (this.id = this.route.snapshot.params["id"]) {
      this.route.params.subscribe(params => {
        this.id = params["id"];
        Estudante.get(this.id).subscribe(atualizarEstudante => {
          this.estudante = atualizarEstudante;
          this.isAtualizacao = true;
        }
        )
      });


    }
  }
  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.estudante.nome + "O estudante foi cadastrado"});
  }
 

  messageUpdate() {
    this.messageService.add({severity:'warn', summary:'Alterado!', detail: this.estudante.nome + "O estudante foi alterado"});
  }

  messageErro() {
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar o estudante', detail: 'O usuario não foi cadastrado'});
  }
  messageErroCadastro() {
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar o estudante', detail: 'O estudante já foi cadastrado'});
  }



  cadastrarEstudante() {
    Estudante.getAll(this.estudante);
    for (let i =0; i<this.estudantes.length; i++){
      if (this.estudantes[i].email != this.estudante.email){
      this.estudante.save().subscribe (resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]);
        this.messageCadastro();

      },
      err => {
       this.messageErroCadastro();

      });
    } else {
    
    }
    }
  }
}

