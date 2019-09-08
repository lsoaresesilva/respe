import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-acompanhar-desempenho',
  templateUrl: './acompanhar-desempenho.component.html',
  styleUrls: ['./acompanhar-desempenho.component.css']
})
export class AcompanharDesempenhoComponent implements OnInit {

  estudante;

  constructor( private loginService:LoginService ) {
    
  }

  ngOnInit() {
    this.estudante = this.loginService.getUsuarioLogado();
  }

}
