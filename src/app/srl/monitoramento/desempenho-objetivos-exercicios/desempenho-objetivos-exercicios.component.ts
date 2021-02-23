import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { AnalisarObjetivosService } from '../../analisar-objetivos.service';

@Component({
  selector: 'app-desempenho-objetivos-exercicios',
  templateUrl: './desempenho-objetivos-exercicios.component.html',
  styleUrls: ['./desempenho-objetivos-exercicios.component.css'],
})
export class DesempenhoObjetivosExerciciosComponent implements OnInit {
  
  progresso;

  constructor(private analiseObjetivo: AnalisarObjetivosService, private login: LoginService) {}

  ngOnInit(): void {
    this.analiseObjetivo.verificarObjetivoExercicios(this.login.getUsuarioLogado()).subscribe({
      next: (progresso) => {
        this.progresso = progresso;
      },
    });
  }
}
