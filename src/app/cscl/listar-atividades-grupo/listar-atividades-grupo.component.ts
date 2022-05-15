import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';
import Usuario from 'src/app/model/usuario';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listar-atividades-grupo',
  templateUrl: './listar-atividades-grupo.component.html',
  styleUrls: ['./listar-atividades-grupo.component.css']
})
export class ListarAtividadesGrupoComponent implements OnInit {

  atividades;
  usuario:Usuario;


  constructor(private login:LoginService) {
    this.atividades = []
    this.usuario = this.login.getUsuarioLogado();
   }

  ngOnInit(): void {

    AtividadeGrupo.getAll(new Query("turmaCodigo", "==", this.usuario.turma.codigo)).subscribe(as => {
      this.atividades = as;
      this.gerarLink();
    });

  }

  converterParaDate(data){
    return Util.firestoreDateToDate(data);
  }

  /**
   * Gera o link para cada atividade
   */
  gerarLink(){
    if(Array.isArray(this.atividades) && this.usuario != null){
      this.atividades.forEach(atividade=>{
        atividade.link = atividade.gerarLink(this.usuario);
      })
    }
  }




}
