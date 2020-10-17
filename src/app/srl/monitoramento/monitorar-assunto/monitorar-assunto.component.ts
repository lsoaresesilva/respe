import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-monitorar-assunto',
  templateUrl: './monitorar-assunto.component.html',
  styleUrls: ['./monitorar-assunto.component.css'],
})
export class MonitorarAssuntoComponent implements OnChanges {
  constructor(private loginService: LoginService) {}

  @Input()
  assunto: Assunto;

  ngOnChanges(): void {
    const usuario = this.loginService.getUsuarioLogado();
    if (usuario != null) {
      Assunto.calcularPercentualConclusao(this.assunto, usuario).subscribe((percentual) => {
        this.assunto.percentualConclusao = percentual;
      });
    }
  }
}
