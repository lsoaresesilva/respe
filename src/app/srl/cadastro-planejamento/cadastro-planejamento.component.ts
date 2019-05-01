import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Assunto } from '../../model/assunto';
import { Planejamento } from '../../model/planejamento';
import Estudante from '../../model/estudante';
import { Dificuldade } from '../../model/dificuldade';
import { Router } from '@angular/router';
//import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css']
})
export class CadastroPlanejamentoComponent implements OnInit {

  dificuldades: SelectItem[];
  assuntos;
  index: number = 0;
  planejamento: Planejamento;
  


  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    // TODO: carregar do login
    this.planejamento = new Planejamento(null,new Estudante(1, null),null,0,"",0,"");
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

        this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }])
      // this.messageService.add({severity:'Sucesso', summary: 'Success Message', detail:'Planejamento salvo com sucesso!'});
      //  this.router.navigate(['planejamentos/listar']);
    }, err=>{
      // this.messageService.add({severity:'Erro', summary: 'Error Message', detail:'Algo inesperado aconteceu, tente novamente mais tarde.'});
      });
    }else{
      // this.messageService.add({severity:'Campos Vazios', summary: 'Warn Message', detail:'Preencha todos os campos se quiser realizar salvar o planejamento'});
    }
  }



}
