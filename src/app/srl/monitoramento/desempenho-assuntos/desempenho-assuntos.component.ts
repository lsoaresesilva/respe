import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { Assuntos } from 'src/app/model/enums/assuntos';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-desempenho-assuntos',
  templateUrl: './desempenho-assuntos.component.html',
  styleUrls: ['./desempenho-assuntos.component.css']
})
export class DesempenhoAssuntosComponent implements OnInit {


  assuntos = [];

  constructor(private login:LoginService) { }

  ngOnInit() {

    Assunto.getAll().subscribe(assuntos=>{
      this.assuntos = assuntos;
      this.assuntos.forEach(assunto => {
        Assunto.calcularPercentualConclusao(assunto, this.login.getUsuarioLogado()).subscribe(percentual=>{
          
          assunto["percentual"] = percentual;
        })
        
      });
    })
  }

}
