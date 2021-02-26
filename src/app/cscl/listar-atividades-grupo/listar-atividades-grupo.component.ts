import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Query from 'src/app/model/firestore/query';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listar-atividades-grupo',
  templateUrl: './listar-atividades-grupo.component.html',
  styleUrls: ['./listar-atividades-grupo.component.css']
})
export class ListarAtividadesGrupoComponent implements OnInit {

  atividades

  constructor(private login:LoginService) {
    this.atividades = []
   }

  ngOnInit(): void {

    AtividadeGrupo.getAll(new Query("estudantes", "array-contains", this.login.getUsuarioLogado().pk())).subscribe(as => {
      this.atividades = as;
    });
  }

  converterParaDate(data){
    return Util.firestoreDateToDate(data);
  }


}
