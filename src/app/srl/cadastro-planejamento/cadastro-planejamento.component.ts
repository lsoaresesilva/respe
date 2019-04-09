import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Assunto } from '../../model/assunto';
import { Planejamento } from '../../model/planejamento';
import Estudante from '../../model/estudante';
import { Dificuldade } from '../../model/dificuldade';
@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css']
})
export class CadastroPlanejamentoComponent implements OnInit {

  tempo = 1;
  importancia;
  dificuldade;
  dificuldades: SelectItem[];
  assunto;
  assuntos;
  index: number = 0;
  planoExecucao;
  planejamento: Planejamento;
  


  constructor() { 

    this.planejamento = new Planejamento(null,new Estudante(1),null,"","",0,"");
  }

  ngOnInit() {
    
    Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});

    this.dificuldades=[
      {label:'Selecione uma dificuldade', value:null},
      {label:'Difícil', value: Dificuldade.dificil},
      {label:'Normal', value: Dificuldade.medio},
      {label:'Facíl', value:Dificuldade.facil},
    ];
  }

  cadastrarPlanejamento(){
    if(this.planejamento){
      this.planejamento.save().subscribe(resultado=>{
        alert("tudo certo");
      }, err=>{
        console.log(err);
      });
    }else{
      alert("preencha todos os campos!");
    }
  }

  mostrarProximo(assunto){
    this.planejamento.assunto = assunto;
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

}
