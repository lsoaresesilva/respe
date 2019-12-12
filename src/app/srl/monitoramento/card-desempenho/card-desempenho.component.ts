import { Component, OnInit, Input } from '@angular/core';
import { Tutor } from 'src/app/model/tutor';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-card-desempenho',
  templateUrl: './card-desempenho.component.html',
  styleUrls: ['./card-desempenho.component.css']
})
export class CardDesempenhoComponent implements OnInit {

  @Input() errorQuotient;

  desempenhoPorErrorQuotient;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.desempenhoPorErrorQuotient = this.desempenhoEstudante(this.errorQuotient);
    Tutor.getDesempenhoEstudante(this.loginService.getUsuarioLogado()).subscribe(percentual=>{
      let p = percentual;
      let x = p;
    })
  }

  desempenhoEstudante(errorQuotient){

    if(errorQuotient >= 0.0 && errorQuotient <= 0.25){
        return "Excelente";
    }else if(errorQuotient > 0.25 && errorQuotient <= 0.50){
        return "Bem";
    }else if(errorQuotient > 0.50 && errorQuotient <= 0.70){
        return "Razoável";
    }else if(errorQuotient > 0.75){
        return "Precisa melhorar (cuidado)";
    }
}

}
