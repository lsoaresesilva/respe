import { Component, OnInit } from '@angular/core';
import Diario from 'src/app/model/srl/diario';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {


  display;
  diario:Diario;

  constructor(private login:LoginService) {
    this.diario = new Diario(null, null, this.login.getUsuarioLogado());
    this.display = false;
   }

  ngOnInit() {
  }

  apresentarDiario(){
    Diario.possuiDiarioAtualizado(this.login.getUsuarioLogado()).subscribe(resultado=>{
      this.display = !resultado;
    });
  }

}
