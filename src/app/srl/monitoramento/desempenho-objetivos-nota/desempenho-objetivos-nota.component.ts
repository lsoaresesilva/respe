import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { AnalisarObjetivosService } from '../../analisar-objetivos.service';

@Component({
  selector: 'app-desempenho-objetivos-nota',
  templateUrl: './desempenho-objetivos-nota.component.html',
  styleUrls: ['./desempenho-objetivos-nota.component.css'],
})
export class DesempenhoObjetivosNotaComponent implements OnInit {
  progresso;

  constructor(private analiseObjetivo: AnalisarObjetivosService, private login: LoginService) {}

  ngOnInit(): void {
    this.analiseObjetivo.verificarObjetivoNota(this.login.getUsuarioLogado()).subscribe({
      next: (progresso) => {
        this.progresso = progresso;
      },
    });
  }
}
