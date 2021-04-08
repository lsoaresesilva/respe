import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginService } from 'src/app/login-module/login.service';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';

@Component({
  selector: 'app-diario-programacao',
  templateUrl: './diario-programacao.component.html',
  styleUrls: ['./diario-programacao.component.css'],
  providers: [EscapeHtmlPipe]
})
export class DiarioProgramacaoComponent implements OnInit {

  tipo;
  diario:DiarioProgramacao;

  constructor(public login:LoginService, public config: DynamicDialogConfig, private messageService: MessageService, public ref: DynamicDialogRef) { 
    
  }

  ngOnInit(): void {
    
    this.tipo = this.config.data.tipo;
    this.config.header = this.getTitulo();
    this.config.closable = false;
    this.config.closeOnEscape = false;
    this.diario = new DiarioProgramacao(null, "", this.login.getUsuarioLogado(), this.tipo);
  }

  

  contagemCaracteres(referencia: string) {
    let restante = 50 - referencia.length;
    return restante <= 0 ? 0 : restante;
  }

  getTitulo(){
    if(this.tipo == TipoDiarioProgramacao.planejamento){
      return "Como você pretende resolver essa questão?"
    }else if(this.tipo == TipoDiarioProgramacao.monitoramento){
      return "O que você pensa em fazer para contornar esses problemas?"
    }else if(this.tipo == TipoDiarioProgramacao.reflexao){
      return "Agora que terminou.. o que deu certo e o que deu errado?"
    }
  }

  getTexto(){
    if(this.tipo == TipoDiarioProgramacao.planejamento){
      return "Descreva as ações que você realizará para resolver esse problema."
    }else if(this.tipo == TipoDiarioProgramacao.monitoramento){
      return "Para que você está com algumas dificuldades...<br>o que você pensa em fazer para resolver esses problemas?"
    }else if(this.tipo == TipoDiarioProgramacao.reflexao){
      return "Reflita sobre as dificuldades que você teve ao criar esse e outros algoritmos. Como você as superou?<br> Pense também o que você fez que lhe ajudou e pode ser repetido nos próximos estudos."
    }
  }

  salvar(){
    if(this.diario.validar()){
      this.diario.save().subscribe(
        () => {
          
        },
        () => {},
        () => {
          this.ref.close();
        }
      );
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'É preciso preencher os campos',
        detail:
          'Antes de avançar é preciso responder a pergunta. Lembre-se que sua resposta deve ter no mínimo 50 caracteres.',
      });
    }
  }



  


}
