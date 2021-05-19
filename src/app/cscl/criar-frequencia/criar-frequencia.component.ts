import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Frequencia from 'src/app/model/cscl/frequencia';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-criar-frequencia',
  templateUrl: './criar-frequencia.component.html',
  styleUrls: ['./criar-frequencia.component.css']
})
export class CriarFrequenciaComponent implements OnInit {

  turmaSelecionada;
  pesquisaTurmas;
  link;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

    
  }

  salvar(){
    if(this.turmaSelecionada == null){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Selecione uma turma antes de prosseguir.',
      });
    }else{
      let frequencia = new Frequencia(null, this.turmaSelecionada);
      frequencia.save().subscribe(()=>{
        this.link = "https://www.32b.com.br/preencher-frequencia/"+this.turmaSelecionada.codigo+"/"+frequencia.pk()
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Frequência criada com sucesso.',
        });
      });
    }
    
  }

  pesquisarTurma(event) {
    Turma.pesquisar(new Query('codigo', '==', event.query)).subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });
  }


}
