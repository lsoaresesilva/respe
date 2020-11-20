import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planejamento } from 'src/app/model/planejamento';
import { Assunto } from 'src/app/model/assunto';
import Usuario from 'src/app/model/usuario';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import Query from 'src/app/model/firestore/query';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-vizualizar-planejamento',
  templateUrl: './vizualizar-planejamento.component.html',
  styleUrls: ['./vizualizar-planejamento.component.css'],
})
export class VisualizarPlanejamentoComponent implements OnInit {
  planejamento: Planejamento;
  assuntos;
  assuntoSelecionado: Assunto;

  materialDeEstudo: any[] = [];
  questoes: any[] = [];
  progresso = 0;
  isFinalizado?;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id == undefined) {
        throw new Error('É preciso informar o id de um planejamento');
      }

      Planejamento.get(params.id).subscribe((planejamentoCadastrado) => {
        this.planejamento = planejamentoCadastrado;
        Assunto.getAll(null, 'sequencia').subscribe((assuntos) => {
          this.assuntos = assuntos;
        });
      });
    });
  }

  abrirAssunto(assunto) {
    this.router.navigate([
      'main',
      { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } },
    ]);
  }

  iniciarAutoReflexao() {
    this.router.navigate([
      'main',
      { outlets: { principal: ['autoreflexao', this.planejamento.pk()] } },
    ]);
  }
}
