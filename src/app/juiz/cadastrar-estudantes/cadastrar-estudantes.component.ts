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
  isAtualizacao

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

  cadastrarEstudante() {
    if (this.estudante) {
      this.estudante.save().subscribe(resultado => {
        this.messageService.add({ severity: 'sucesso', summary: 'Estudante salvo com sucesso.' });
        this.messageService.add({ severity: 'info', summary: 'Estudante cadastrado', detail: this.estudante.nome });
        this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]);

      },
        err => {
          this.messageService.add({ severity: 'erro', summary: 'Houve um erro:', detail: err.toString() });
        });

    }

  }

}

