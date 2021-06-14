import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listar-atividades-grupo-professor',
  templateUrl: './listar-atividades-grupo-professor.component.html',
  styleUrls: ['./listar-atividades-grupo-professor.component.css'],
})
export class ListarAtividadesGrupoProfessorComponent implements OnInit {
  atividades;

  turmaSelecionada: Turma;
  pesquisaTurmas;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  abrirCriacaoGrupo() {
    this.router.navigate(['geral/main', { outlets: { principal: ['cscl', 'criar-atividade-grupo'] } }]);
  }

  criarFrequencia() {
    this.router.navigate(['geral/main', { outlets: { principal: ['cscl', 'criar-frequencia'] } }]);
  }


  pesquisarTurma(event) {
    Turma.pesquisar(new Query('codigo', '==', event.query)).subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });
  }

  selecionarTurma(event) {
    this.turmaSelecionada.getallAtividadesGrupo().subscribe((atividades) => {
      this.atividades = atividades;
    });
  }

  converterParaDate(data) {
    return Util.firestoreDateToDate(data);
  }

  abrirAtividade(atividade){
    if(atividade.pk() != null){
      //this.router.navigate(['geral/main', { outlets: { principal: ['visualizacao-atividade-grupo-professor', atividade.pk()] } }]);
      this.router.navigate(['geral/main', { outlets: { principal: ['cscl', 'visualizacao-atividade-grupo-professor', atividade.pk()] } }]);
    }
    
  }
}
