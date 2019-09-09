import { Component, OnInit } from '@angular/core';
import Erro from 'src/app/model/erro';
import Query from 'src/app/model/firestore/query';
import { TipoErro } from 'src/app/model/tipoErro';
import { Mes } from 'src/app/model/mes';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'erros-programacao',
  templateUrl: './erros-programacao.component.html',
  styleUrls: ['./erros-programacao.component.css']
})
export class ErrosProgramacaoComponent implements OnInit {

  
  


  constructor(private loginService:LoginService) {

  }

  ngOnInit() {
    let dados = []
    

    

    

  }

  

  

}
