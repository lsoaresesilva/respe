import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { AutoInstrucao } from 'src/app/model/autoInstrucao';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/juiz/login.service';
import { Observable } from 'rxjs';
import Query from 'src/app/model/firestore/query';


@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css']
})
export class SelfInstructionComponent implements OnInit {
  

  private autoInstrucao:AutoInstrucao;
  private questao;
  private assunto;
  private usuario;
  

    constructor(private route: ActivatedRoute, private router: Router ,private login : LoginService) {
      this.usuario = this.login.getUsuarioLogado();
      this.autoInstrucao = new AutoInstrucao (null,this.login.getUsuarioLogado(),null,null,null,null,null,null,null);
    }

  ngOnInit() {
    this.getQuestao();
   
  }

  getQuestao(){
    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          this.assunto = assunto;
          if (assunto["questoesProgramacao"] != undefined && assunto["questoesProgramacao"].length > 0) {
            assunto["questoesProgramacao"].forEach(questao => {
              if (questao.id == params["questaoId"]) {
                this.questao = questao;
                this.autoInstrucao.questao = this.questao;
                this.getRespostasEstudante();
 
              }
            });
          }
        });  

      } else {
         throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
        }
    });
  }
  
  getRespostasEstudante(){
    AutoInstrucao.getAutoInstrucao(this.usuario.id,this.questao.id).subscribe(autoInstrucao =>{

      if(autoInstrucao != undefined){
        this.autoInstrucao = autoInstrucao;
        this.autoInstrucao.estudante= this.usuario;
        this.autoInstrucao.questao = this.questao;   
      }

    });

  }

  salvar(){ 
    this.autoInstrucao.save().subscribe(resultado => {
      this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(),this.questao.id] }}]);

      },err => {
      alert("Ocorreu um problema, tente novamente!");
    });
   
  } 
   

}
