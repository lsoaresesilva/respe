import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { AutoInstrucao } from 'src/app/model/autoInstrucao';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/login-module/login.service';
import AssuntoQuestao from 'src/app/model/assuntoQuestao';



@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css']
})
export class SelfInstructionComponent implements OnInit {
  

  autoInstrucao;
  private questao?;
  private id: number;
  private sub: any;
  private assunto;
  private assuntos;
  condicoes;
  repeticoes;
  funcoes;
  vetores;
  
   constructor(private route: ActivatedRoute, private router: Router ,private login : LoginService) {
    this.questao = new Questao(null, null, null, null, null, [], [],null);
    this.autoInstrucao = new AutoInstrucao (null,this.login.getUsuarioLogado(),this.questao,null,null,null,null,null,null);
   }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          this.assunto = assunto;
          if (assunto["questoesProgramacao"] != undefined && assunto["questoesProgramacao"].length > 0) {
            assunto["questoesProgramacao"].forEach(questao => {
              if (questao.id == params["questaoId"]) {
                this.questao = questao;
                this.buscarAssuntos();
                 
              }
            });
          }
          });
        
      } else {
        throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
      }

    });
     

  }
  

  salvar(){
      this.autoInstrucao.save().subscribe(resultado => {
      this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(),this.questao.id] }}]);

      },
       err => {
      alert("teve algum problema:"+err);
      });
    } 
   
  buscarAssuntos(){
    let assuntos=[];
    this.questao.assuntos.push(this.assunto); //incluindo o assunto principal
    

    this.questao.assuntos.forEach(assunto =>{
      Assunto.get(assunto.id).subscribe(assuntoBanco =>{
        assuntos.push(assuntoBanco["nome"]);
        this.apresentarPerguntas(assuntos);
      });
    });
     
  }

  apresentarPerguntas(assuntos){
    assuntos.forEach(assunto=>{
       
      switch(assunto){
        case "repeticoes":{
          this.repeticoes = true;
          break;}
        case "condicoes":{
          this.condicoes = true;
          break;}
        case "funcoes":{
          this.funcoes = true;
          break;}
        case "vetores":{
          this.vetores = true;
          break;}
      }
    });
  }
    

}
    