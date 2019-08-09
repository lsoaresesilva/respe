import { Component, OnInit, Input } from '@angular/core';
import Postagem from 'src/app/model/postagem';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/juiz/login.service';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-postagens',
  templateUrl: './listar-postagens.component.html',
  styleUrls: ['./listar-postagens.component.css']
})
export class ListarPostagensComponent implements OnInit {

  postagens;
  usuario;
  @Input()
  turma;

  constructor(private login: LoginService) {
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {
    Postagem.getAll(new Query("turmaId", "==", this.turma.pk())).subscribe(postagens => {
    this.postagens = postagens;

      this.postagens.forEach(postagem => {
        postagem.estudante = new Usuario(null, null, null, null);
        Usuario.get(postagem.estudanteId).subscribe(estudante => {
          postagem.estudante = estudante;
        });


      });


    });

  });





}


cadastrar(){

  this.router.navigate(["main", { outlets: { principal: ['cadastrar-postagem', this.turmaId] } }]);
}

abrirPostagem(postagem){
  this.router.navigate(["main", { outlets: { principal: ['visualizar-postagem', postagem.id] } }]);
}
}
