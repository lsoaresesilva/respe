import { Component, OnInit } from '@angular/core';
import AutoReflexao from 'src/app/model/autoReflexao';
import { Message } from 'primeng/api';
import { Assunto } from 'src/app/model/assunto';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';
import { Planejamento } from 'src/app/model/planejamento';

@Component({
  selector: 'app-auto-reflexao',
  templateUrl: './auto-reflexao.component.html',
  styleUrls: ['./auto-reflexao.component.css'],
})
export class AutoReflexaoComponent implements OnInit {
  autoReflexao: AutoReflexao;
  msgs: Message[];
  niveisConfianca: SelectItem[];

  constructor() {}

  ngOnInit() {
    this.msgs = [];

    this.niveisConfianca = [
      { label: 'Selecione um nível de confiança', value: null },
      { label: 'Pouco confiante', value: NivelConfianca.pouco },
      { label: 'Confiante', value: NivelConfianca.normal },
      { label: 'Muito confiante', value: NivelConfianca.alto },
    ];
  }

  salvar() {
    if (this.autoReflexao.validar()) {
      this.autoReflexao.save().subscribe((resulado) => {
        this.msgs.push({ severity: 'success', summary: 'Dados salvos com sucesso.' });
      });
    } else {
      this.msgs.push({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso preencher todos os campos.',
      });
    }
  }
}
