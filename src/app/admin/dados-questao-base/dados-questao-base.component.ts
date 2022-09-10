import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { Dificuldade } from 'src/app/model/aprendizagem/questoes/enum/dificuldade';
import QuestaoBase from '../../model/aprendizagem/questoes/questaoBase';

@Component({
  selector: 'app-dados-questao-base',
  templateUrl: './dados-questao-base.component.html',
  styleUrls: ['./dados-questao-base.component.css']
})
export class DadosQuestaoBaseComponent implements OnInit, OnChanges {

  dificuldades: SelectItem[];
  items: MenuItem[];

  @Input() assunto: Assunto;
  @Input() questao: QuestaoBase;
  @Output() questaoChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(private router: Router, ) { }

  ngOnInit(): void {

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];
  }

  ngOnChanges(): void {
    if(this.questao != null && this.assunto != null && this.items == null) {
      const menuItems = [];
      menuItems.push(
        {label: this.assunto.nome, command: (click) => {this.router.navigate([
          'geral/main',
          { outlets: { principal: ['admin', 'visualizar-assunto-admin', this.assunto.pk()] } },
        ]); }},
        {label: this.questao.nomeCurto},
        {label:'Alterar questão'}
      );

      this.items = menuItems;
    }
  }

  alterarConceitos(conceitos) {
    this.questao.conceitos = conceitos;
  }

}
