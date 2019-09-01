import { Component, OnInit } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from '../../login-module/login.service';
import { RespostaQuestaoFechada } from 'src/app/model/respostaQuestaoFechada';
import { MessageService, ConfirmationService } from 'primeng/api';
import Alternativa from 'src/app/model/alternativa';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css']
})
export class VisualizarQuestaoFechadaComponent implements OnInit {

  private questao;
  private respostaQuestaoFechada;
  private mostrar;
  private respostaUsuarioBanco;
  private usuario;
  private id;

  constructor(private route: ActivatedRoute, private router: Router, private login: LoginService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.questao = new QuestaoFechada(this.id, null, null, null, [], [], null);
    this.usuario = login.getUsuarioLogado();
    this.respostaQuestaoFechada = new RespostaQuestaoFechada(null, this.login.getUsuarioLogado(), null, this.questao);
  }

  carregarQuestao(assunto, questao){
    
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params["questaoId"]
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          
          if (assunto["questoesFechadas"] != undefined && assunto["questoesFechadas"].length > 0) {
            this.questao = assunto["getQuestaoFechadaById"](params["questaoId"]);
            this.respostaQuestaoFechada.getRespostaQuestaoEstudante(this.questao, this.usuario).subscribe(respostaUsuario => {
              this.respostaUsuarioBanco = respostaUsuario
        
              if (respostaUsuario != null) {
        
                this.respostaQuestaoFechada.resposta = respostaUsuario;
                this.mostrar = true;
              }
        
            });
          }
        });

      } else {
        throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
      }

    });


    


  }

 

  confirmar() {

    if (this.respostaQuestaoFechada.resposta == null) {
      this.messageService.add({ severity: 'info', summary: 'ops...', detail: "É preciso marca alguma alternativa!" });
    }

    else if (this.respostaUsuarioBanco != undefined) {
      this.messageService.add({ severity: 'warn', summary: 'ops...', detail: "Só é possível responder uma vez!" });
    }

    else {
      this.confirmationService.confirm({
        message: 'Você não poderá responder essa questão novamente,tem certeza da resposta?',
        accept: () => {
          this.responder();
        }
      });
    }

  }

  responder() {

    this.respostaUsuarioBanco = this.respostaQuestaoFechada.resposta;
    this.respostaQuestaoFechada.questao = this.questao;

    this.respostaQuestaoFechada.save().subscribe(resultado => {
      this.mostrar = true;
      let resposta = this.questao.getAlternativaCerta();

      if (this.respostaQuestaoFechada.resposta == resposta) {
        this.messageService.add({ severity: 'success', summary: 'Parabéns!', detail: " Você acertou essa questão!" });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'ops...', detail: "você errou essa questao!" });
      }


    });


  }














}


