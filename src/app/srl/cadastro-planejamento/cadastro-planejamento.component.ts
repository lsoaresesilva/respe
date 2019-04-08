import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Assunto } from '../../model/assunto';
import { Planejamento } from '../../model/planejamento';

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
  


  constructor() { }

  ngOnInit() {
    
    Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});

    this.dificuldades=[
      {label:'Selecione uma dificuldade', value:null},
      {label:'Difícil', value:{id:1, nome: 'Difícil'}},
      {label:'Normal', value:{id:2, nome: 'Normal'}},
      {label:'Facíl', value:{id:3, nome: 'Facíl',}},
    ];
  }

  cadastrarPlanejamento(){
   /* let p = new Planejamento()
p.save().subscribe(resultado=>{
// salvou com sucesso
}, err=>{
// erro no save
});
*/
  }

  mostrarProximo(assunto){
    this.assunto = assunto;
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }
}
