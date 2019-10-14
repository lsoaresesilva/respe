import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import geradorCodigo from 'src/app/util/geradorCodigo';
import GeradorCodigo from 'src/app/util/geradorCodigo';
import { RespostaQuestaoExperimento } from 'src/app/model/experimento/respostaQuestaoExperimento';
import { PreTesteComponent } from 'src/app/experimento/pre-teste/pre-teste.component';
import PosTeste from 'src/app/model/experimento/posTeste';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  itens: MenuItem[];
  private usuario;
  visibilidadeDialog;


  constructor(private router: Router, private login:LoginService) { 
    this.usuario = this.login.getUsuarioLogado();
  }

  criarMenu(){
    if(this.usuario.perfil == 3){
      this.itens = [
        {
          label: 'Turmas',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }
  
        },
        {
          label: 'Estudantes',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }
  
        },
        {
          label: 'Assuntos',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }
  
        },
        
        {
          label: 'Sair',
          command: () => {this.logout()}
        }
      ];
    }else{
      this.itens = [
        {
          label: 'Assuntos',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }
  
        },
        {
          label: 'Planejamentos',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) }
  
        },
        {
          label: 'Minha turma',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['minha-turma'] } }]) }
  
        },
        {
          label: 'Meu desempenho',
          command: () => { this.router.navigate(["main", { outlets: { principal: ['meu-desempenho'] } }]) }
  
        },
        {
          label: 'Sair',
          command: () => {this.logout()}
        }
      ];
    }
  }

  ngOnInit() {
    this.criarMenu();
    this.apresentarPretest();
    
  }

  apresentarPretest(){
    RespostaQuestaoExperimento.isFinalizado(this.login.getUsuarioLogado()).subscribe(resultado=>{
      if(resultado){
        this.apresentarPostest();
      }else{
        this.visibilidadeDialog = !resultado;
      }
      
    })
  }

  apresentarPostest(){
    PosTeste.apresentar(this.login.getUsuarioLogado()).subscribe(resultado=>{
      this.visibilidadeDialog = resultado;
    })
  }

  private logout() {
    if(this.login.logout()){
      return this.router.navigate([""])
    }
  }


}
