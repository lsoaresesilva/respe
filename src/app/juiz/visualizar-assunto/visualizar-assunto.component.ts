import { Component, OnInit, Input } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../login-module/login.service';

@Component({
  selector: 'app-visualizar-assunto',
  templateUrl: './visualizar-assunto.component.html',
  styleUrls: ['./visualizar-assunto.component.css'],
})
export class VisualizarAssuntoComponent implements OnInit {
  @Input()
  assunto;

  usuario;

  constructor(private route: ActivatedRoute, private router: Router, public login: LoginService) {
    this.assunto = new Assunto(null, null);
  }

  dialogImportanciaAssunto;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id'] != null) {
        Assunto.get(params['id']).subscribe((resultado) => {
          this.assunto = resultado;
        });
      }
    });
    this.usuario = this.login.getUsuarioLogado();
    this.exibirDialogImportanciaAssunto();
  }

  exibirDialogImportanciaAssunto() {
    const visualizouImportancia = [
      ...(JSON.parse(localStorage.getItem('visualizouImportancia')) === null
        ? []
        : JSON.parse(localStorage.getItem('visualizouImportancia'))),
    ];

    if (!visualizouImportancia.includes(this.login.getUsuarioLogado().pk())) {
      visualizouImportancia.push(this.login.getUsuarioLogado().pk());

      localStorage.setItem('visualizouImportancia', JSON.stringify(visualizouImportancia));
      this.dialogImportanciaAssunto = true;
    }
  }

  /* exibirDialogImportancia(event){
    if(this.planejamento.assunto != null){
      this.dialogImportanciaAssunto = true;
    }
  } */
}
