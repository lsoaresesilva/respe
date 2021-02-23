import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import Query from 'src/app/model/firestore/query';
import Diario from 'src/app/model/srl/diario';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listagem-diario',
  templateUrl: './listagem-diario.component.html',
  styleUrls: ['./listagem-diario.component.css']
})
export class ListagemDiarioComponent implements OnInit {

  diarios$:any[];
  usuario;

  constructor(private login:LoginService) { 
    
  }

  ngOnInit(): void {
    this.usuario = this.login.getUsuarioLogado();
    if(this.usuario != null){
      Diario.getAll(new Query("estudanteId", "==", this.usuario.pk())).subscribe(diarios=>{
        this.diarios$ = this.ordenarDiarios(diarios);
      });
    }
    
  }

  abrirDiario(diario){

  }

  formatarData(data){
    return Util.formatarData(data);
  }

  ordenarDiarios(diarios:Diario[]){
    
    return diarios.sort((d1, d2)=>{
      return Util.diffBetweenDates(new Date (d1.data.seconds * 1000), new Date (d2.data.seconds * 1000));
    })
  }

}
