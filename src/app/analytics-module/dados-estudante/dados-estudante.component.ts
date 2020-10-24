import { Component, Input, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-dados-estudante',
  templateUrl: './dados-estudante.component.html',
  styleUrls: ['./dados-estudante.component.css'],
})
export class DadosEstudanteComponent implements OnInit {
  @Input()
  estudante;

  constructor(private login: LoginService) {}

  ngOnInit(): void {}
}
