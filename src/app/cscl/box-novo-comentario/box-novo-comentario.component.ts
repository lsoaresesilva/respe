import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ComentarioCodigo from 'src/app/model/comentarioCodigo';
import Usuario from 'src/app/model/usuario';
import Submissao from 'src/app/model/submissao';

declare var dialogEmExibicao: any;

@Component({
  selector: 'box-novo-comentario',
  templateUrl: './box-novo-comentario.component.html',
  styleUrls: ['./box-novo-comentario.component.css']
})
export class BoxNovoComentarioComponent implements OnInit {

  @Input("visibilidade") visibilidade;
  @Output("comentario") resposta = new EventEmitter();
  @Output("statusDialog") status = new EventEmitter();
  //comentario:ComentarioCodigo;
  texto:string

  constructor() {
    // TODO: pegar submissao do input
    //this.comentario = new ComentarioCodigo(null, Usuario.getUsuarioLogado(), new Submissao("Fz0penFp04A3z5xus6qF", null, null, null), null, null);
    this.texto = "";
  }

  ngOnInit() {
  }

  salvar(){
    this.resposta.emit(this.texto);
    this.texto = "";
  }

  fecharDialog(){
    this.status.emit(false);
  }

}
