import { Component, OnInit, Input } from '@angular/core';
import QuestaoExperimento from 'src/app/model/experimento/questaoExperimento';
import { RespostaQuestaoExperimento } from 'src/app/model/experimento/respostaQuestaoExperimento';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pre-teste',
  templateUrl: './pre-teste.component.html',
  styleUrls: ['./pre-teste.component.css']
})
export class PreTesteComponent implements OnInit {

  questoes;
  respostas;
  @Input() visibilidade;

  constructor() {
    this.respostas = [];
    
  }

  ngOnInit() {

    QuestaoExperimento.getAll().subscribe(questoes=>{
      this.questoes = questoes;
      for(let i = 0; i < questoes.length; i++){
        this.respostas.push(new RespostaQuestaoExperimento(null));
      }
    })
  }

  validar(){
    for(let i = 0; i < this.respostas.length; i++){
      if(this.respostas[i].questao == undefined && this.respostas[i].alternativa == undefined)
        return false;
    }
      
    return true;
  }

  salvar(){
    if(this.validar()){
      let salvar = []
      this.respostas.forEach(resposta => {
          salvar.push(resposta.save());
      });

      if(salvar.length > 0){
        forkJoin(salvar).subscribe(resultado=>{
          this.visibilidade = false;
        }, err=>{
          alert("Houve um erro ao salvar as suas respostas. Por gentileza tente novamente mais tarde.")
          // TODO: dar um rollback na transação
        })
      }else{
        alert("Houve um erro ao salvar as suas respostas. Por gentileza tente novamente mais tarde.")
      }
      
    }else{
      alert("Você precisa responder as questões para utilizar a plataforma");
    }
  }

  fecharDialog(){
    alert("É preciso responder às perguntas antes de continuar.");
  }


}
