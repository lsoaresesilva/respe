import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Postagem from 'src/app/model/cscl/postagem';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/login-module/login.service';
import Usuario from 'src/app/model/usuario';
import { Router } from '@angular/router';
import { Util } from 'src/app/model/util';



@Component({
  selector: 'app-listar-postagens',
  templateUrl: './listar-postagens.component.html',
  styleUrls: ['./listar-postagens.component.css']
})
export class ListarPostagensComponent implements OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    Postagem.getAll(new Query("codigoTurma", "==", this.turma.codigo)).subscribe(postagens => {
      this.postagens = postagens;

      this.postagens.sort((pA, pB)=>{
        let dataA = Util.firestoreDateToDate(pA.data);
        let dataB = Util.firestoreDateToDate(pB.data);
        if(dataA < dataB){
          return 1;
        }else if(dataA > dataB){
          return -1;
        }

        return 0;
      })

     
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
    this.router.navigate(["main", { outlets: { principal: ['visualizar-postagem', postagem.id] } }]);
  }

  converterDate(dataFirestore){
    if(dataFirestore != null){
      let data = Util.firestoreDateToDate(dataFirestore);
      return data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear();
    }
    
  }
}
