import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Postagem from 'src/app/model/postagem';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/juiz/login.service';
import Usuario from 'src/app/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-postagens',
  templateUrl: './listar-postagens.component.html',
  styleUrls: ['./listar-postagens.component.css']
})
export class ListarPostagensComponent implements OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    Postagem.getAll(new Query("turmaId", "==", this.turma.pk())).subscribe(postagens => {
      this.postagens = postagens;

      this.postagens.reverse();

      this.postagens.forEach(postagem => {
        postagem.estudante = new Usuario(null, null, null, null);
        Usuario.get(postagem.estudanteId).subscribe(estudante => {
          postagem.estudante = estudante;
        });
      });
    });

  }

  postagens;
  usuario;
  @Input("turma")
  turma;

  constructor(private login: LoginService, private router: Router) {
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {

  }

  cadastrar() {

    this.router.navigate(["main", { outlets: { principal: ['cadastrar-postagem', this.turma.pk()] } }]);
  }

  abrirPostagem(postagem) {
    this.router.navigate(["main", { outlets: { principal: ['visualizar-postagem', postagem.id,this.turma.pk()] } }]);
  }
}
