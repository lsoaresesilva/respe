import { Component, OnInit, Input } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import TestCase from 'src/app/model/testCase';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from '../login.service';
import AssuntoQuestao from 'src/app/model/assuntoQuestao';

@Component({
  selector: 'app-listar-questoes',
  templateUrl: './listar-questoes.component.html',
  styleUrls: ['./listar-questoes.component.css']
})
export class ListarQuestoesComponent implements OnInit  {
  
  @Input("assunto") assunto?;

  selectedQuestao: Questao;
  items: MenuItem[];
  usuario;
  assuntos;

  constructor(private messageService: MessageService, private router:Router, private login:LoginService) { 
    
  }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos = assuntos});
    console.log(this.assunto);
    for(let i=0;i< this.assuntos.length;i++){
      console.log(this.assuntos[i].nome)
    }
    this.usuario = this.login.getUsuarioLogado();

    this.items = [
      { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterarQuestao(this.selectedQuestao) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) }
      ];
  }

  abrirEditor(questao){
    this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(), questao.id] }}]);
  }

  alterarQuestao(questao: Questao) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.id] } } ] );
    }
    
  }

  deleteQuestao(questao:Questao) {
  //  for(let i =0;i<this.assunto.length;i++){
  //   if( this.assunto[i].questoesProgramacao.id==questao.id){
       
  //   }
  //  }
     /*Questao.delete(questao.pk()).subscribe(resultado=>{
      
      Questao.getAll().subscribe(questoes=>{this.questoes= questoes});
       
    });*/
  }

  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao'] } }]);
  }
  
}