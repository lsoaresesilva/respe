import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-escolher-questao',
  templateUrl: './escolher-questao.component.html',
  styleUrls: ['./escolher-questao.component.css'],
})
export class EscolherQuestaoComponent implements OnInit {
  assuntoId;
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assuntoId = params['assuntoId'];
      console.log(this.assuntoId);
    });
  }

  cadastrarQuestao() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['cadastro-questao', this.assuntoId] } },
    ]);
  }

  cadastrarQuestaoFechada() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['cadastro-questao-fechada', this.assuntoId] } },
    ]);
  }

  cadastrarQuestaoParson() {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['cadastro-questao-parson', this.assuntoId] } },
    ]);
  }
}
