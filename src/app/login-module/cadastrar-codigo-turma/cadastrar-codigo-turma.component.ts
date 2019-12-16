import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-codigo-turma',
  templateUrl: './cadastrar-codigo-turma.component.html',
  styleUrls: ['./cadastrar-codigo-turma.component.css']
})
export class CadastrarCodigoTurmaComponent implements OnInit {

  codigo;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  

  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['home'] } }]);
  }

}
