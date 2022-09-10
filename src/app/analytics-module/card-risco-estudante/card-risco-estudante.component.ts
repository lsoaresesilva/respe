import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'card-risco-estudante',
  templateUrl: './card-risco-estudante.component.html',
  styleUrls: ['./card-risco-estudante.component.css']
})
export class RiscoEstudanteComponent implements OnInit {

  percentualErrorQuotient;
  @Input() errorQuotient;

  constructor(private loginService: LoginService) {

    this.percentualErrorQuotient = 0;

  }

  ngOnInit() {

    if(this.errorQuotient != undefined){
      this.percentualErrorQuotient = this.errorQuotient*100;
    }
    
  }

}
