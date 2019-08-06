import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/perfilUsuario';

@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css']
})
export class CadastrarEstudantesComponent implements OnInit {

  id;
  usuario;
  isAtualizacao;

  constructor(public router: Router,private route: ActivatedRoute, private messageService: MessageService) {

  }
      
  menssagemCadastro() {
    this.messageService.add({severity:'success', summary:'Estudante cadastrado!', detail:'O '+ this.usuario.nome+" foi cadastrado com sucesso!"});
}

  ngOnInit() {
    this.usuario = new Usuario(null, null, null, PerfilUsuario.estudante);

    if (this.id = this.route.snapshot.params["id"]) {
      this.route.params.subscribe(params => {
        this.id = params["id"];
        Usuario.get(this.id).subscribe(atualizarEstudante => {
          this.usuario = atualizarEstudante;
          this.isAtualizacao = true;
        }
        )
      });


    }
  }

  

  cadastrarEstudante() {
    if (this.usuario.validar()) {
      this.menssagemCadastro();
      this.usuario.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]);
      },
      err => {
        this.messageService.add({ severity: 'erro', summary: 'Houve um erro:', detail: err.toString() });
      });

    }

  }
  

}

