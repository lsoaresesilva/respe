import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { AnalisarObjetivosService } from '../../analisar-objetivos.service';

@Component({
  selector: 'app-desempenho-objetivos-tempo-online',
  templateUrl: './desempenho-objetivos-tempo-online.component.html',
  styleUrls: ['./desempenho-objetivos-tempo-online.component.css'],
})
export class DesempenhoObjetivosTempoOnlineComponent implements OnInit {
  progresso;

  constructor(private analiseObjetivo: AnalisarObjetivosService, private login: LoginService) {}

  ngOnInit(): void {
    this.analiseObjetivo.verificarObjetivoTempoOnline(this.login.getUsuarioLogado()).subscribe({
      next: (progresso) => {
        this.progresso = progresso;
      },
    });
  }
}
