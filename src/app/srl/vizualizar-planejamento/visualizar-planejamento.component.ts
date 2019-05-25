import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planejamento } from 'src/app/model/planejamento';
import { Assunto } from 'src/app/model/assunto';
import { MaterialEstudoService } from '../material-estudo.service';
import Usuario from 'src/app/model/usuario';
import { Questao } from 'src/app/model/questao';
import Query from 'src/app/model/firestore/query';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vizualizar-planejamento',
  templateUrl: './vizualizar-planejamento.component.html',
  styleUrls: ['./vizualizar-planejamento.component.css']
})
export class VisualizarPlanejamentoComponent implements OnInit {
  planejamento: Planejamento;
  materialDeEstudo: any[] = [];
  questoes: any[] = [];
  progresso: number = 0;
  isFinalizado?

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id == undefined){
        throw new Error("É preciso informar o id de um planejamento");
      }


      this.getPlanejamento(params.id);
    });
  }

  getPlanejamento(id){
    Planejamento.get(id).subscribe(planejamentoCadastrado => {
      this.planejamento = planejamentoCadastrado;
      this.getQuestoes();

      Assunto.isFinalizado(this.planejamento.assunto, Usuario.getUsuarioLogado()).subscribe(status=>{
        this.isFinalizado = status;
      })

    });
  }

  getQuestoes(){
    if(this.planejamento.assunto != undefined){
      Questao.getAll(new Query("assuntoPrincipalId", "==", this.planejamento.assunto.pk())).subscribe(questoes=>{
        this.questoes = questoes;
        let consultas:any = {};
        this.questoes.forEach(questao=>{
          
          consultas[questao.pk()] = (Questao.isFinalizada(questao)); // TODO: problema está aqui
        })

        forkJoin(consultas).subscribe(consulta=>{
          let x = 2;
          for(let id in consulta){
            this.questoes.forEach(questao=>{
              if(questao.pk() == id){
                questao["percentualResposta"] = consulta[id];
              }
            })
          }
        });
      })
    }else{
      throw new Error("É preciso que exista um assunto em um planejamento.")
    }
    
  }

  responderQuestao(questao){
    this.router.navigate(['main', { outlets: { principal: ['editor', questao.pk()] } }]);
  }

  iniciarAutoReflexao(){
    this.router.navigate(['main', { outlets: { principal: ['autoreflexao', this.planejamento.pk()] } }]);
  }

}
