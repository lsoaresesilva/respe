import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-felicitacoes',
  templateUrl: './felicitacoes.component.html',
  styleUrls: ['./felicitacoes.component.css']
})
export class FelicitacoesComponent implements OnInit {

  mensagem;

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.mensagem = this.config.data.mensagem;
  }

}
