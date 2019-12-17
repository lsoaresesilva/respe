import { Component, OnInit, Input } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from '../../login-module/login.service';
import { RespostaQuestaoFechada } from 'src/app/model/respostaQuestaoFechada';
import { MessageService, ConfirmationService } from 'primeng/api';
import Alternativa from 'src/app/model/alternativa';
import { Planejamento } from 'src/app/model/planejamento';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css']
})
export class VisualizarQuestaoFechadaComponent implements OnInit {

  @Input("questao") questao;
  private respostaQuestaoFechada;
  private mostrar;
  private respostaUsuarioBanco;
  private usuario;
  private id;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private login: LoginService, private messageService: MessageService, private confirmationService: ConfirmationService) {
   
    this.usuario = login.getUsuarioLogado();
    this.respostaQuestaoFechada = new RespostaQuestaoFechada(null, this.login.getUsuarioLogado(), null, this.questao);
  }

  selecionarAlternativa(alternativa){
    this.respostaQuestaoFechada.alternativa = alternativa;
  }

  gerarHtmlTextoComCodigo(questao){
    
    if(questao.hasCode()){

      let texto = questao.enunciado.replace("'''python", "<pre><code class='language-python' pCode>").replace("'''", "</code></pre>")
      return this.sanitizer.bypassSecurityTrustHtml(texto);
      /*let texto = questao.extrairTextoComCodigo();
      if(texto.length > 2){
        let html = "<span>"+texto[0]+"</span><br/><pre><code class='language-python' pCode>"+texto[1]+"</code></pre><br/>"
        if(texto.length == 3){
          html += "<span>"+texto[2]+"</span>"
        }

        return html;
      }else{
        return texto[0]
      }*/
    }
  }

  ngOnInit() {

    if(this.questao == null){
      this.route.params.subscribe(params => {
        this.id = params["questaoId"]
        if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
          
          
          
          Assunto.get(params["assuntoId"]).subscribe(assunto => {
            
            if (assunto["questoesFechadas"] != undefined && assunto["questoesFechadas"].length > 0) {
              this.questao = assunto["getQuestaoFechadaById"](params["questaoId"]);
              RespostaQuestaoFechada.getRespostaQuestaoEstudante(this.questao, this.usuario).subscribe(respostaUsuario => {
                this.respostaUsuarioBanco = respostaUsuario
          
                if (respostaUsuario != null) {
                  this.respostaQuestaoFechada = respostaUsuario;
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
    


    


  }

 

  confirmar() {

    if (this.respostaQuestaoFechada.alternativa == null) {
      this.messageService.add({ severity: 'info', summary: 'ops...', detail: "É preciso selecionar uma alternativa!" });
    }

    else if (this.respostaUsuarioBanco != undefined) {
      this.messageService.add({ severity: 'warn', summary: 'ops...', detail: "Só é possível responder uma vez!" });
    }

    else {
      this.confirmationService.confirm({
        message: 'Você não poderá responder essa questão novamente.',
        acceptLabel:"Sim",
        rejectLabel:"Não",
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
      let alternativaCerta = this.questao.getAlternativaCerta();

      if (this.respostaQuestaoFechada.alternativa.id == alternativaCerta.id) {
        this.messageService.add({ severity: 'success', summary: 'Parabéns!', detail: " Você acertou essa questão!" });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'ops...', detail: "você errou essa questao!" });
      }


    });


  }














}


