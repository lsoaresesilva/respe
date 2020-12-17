import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import {ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-desempenho-assuntos',
  templateUrl: './desempenho-assuntos.component.html',
  styleUrls: ['./desempenho-assuntos.component.css']
})
export class DesempenhoAssuntosComponent implements AfterViewInit {


  @Input()
  usuarioId
  assuntos = [];

  constructor(private login:LoginService) { }

  ngAfterViewInit() {

      let usuario = null;
      if(this.usuarioId == null){
        usuario = this.login.getUsuarioLogado();
      }else{
        usuario = new Usuario(this.usuarioId, null, null);
      }

      Assunto.getAll().subscribe(assuntos=>{
        this.assuntos = assuntos;
        this.assuntos.forEach(assunto => {
          Assunto.calcularPercentualConclusao(assunto, usuario).subscribe(percentual=>{
            
            assunto["percentual"] = percentual;
          })
          
        });
      })

    
  }

}
