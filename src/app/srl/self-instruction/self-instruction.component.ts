import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { AutoInstrucao } from 'src/app/model/autoInstrucao';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/juiz/login.service';


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
  
  
   constructor(private route: ActivatedRoute, private router: Router ,private login : LoginService) {
    this.questao = new Questao(null, null, null, null, null, [], [],null);
    this.autoInstrucao = new AutoInstrucao (null,this.login.getUsuarioLogado(),this.questao,null,null,null,null,null,null);
   }


  ngOnInit() {
    this.AutoInstrucaoExiste();

    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          this.assunto = assunto;
          if (assunto["questoesProgramacao"] != undefined && assunto["questoesProgramacao"].length > 0) {
            assunto["questoesProgramacao"].forEach(questao => {
              if (questao.id == params["questaoId"]) {
                this.questao = questao;
                
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
    console.log("entrou");
    console.log(this.autoInstrucao);
    // console.log(this.autoInstrucao.questao);
    // console.log(this.autoInstrucao.estudante);
      this.autoInstrucao.save().subscribe(resultado => {
      this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(),this.questao.id] }}]);

      },
       err => {
      alert(err);
      });
    } 
   

 AutoInstrucaoExiste(){
  if(AutoInstrucao.IsExiste("1Jxnchu91yERx0mWmVL8","e3c45b10-fe0d-41c1-aa74-41f17567bbe7")!=null){
    this.autoInstrucao == AutoInstrucao.IsExiste("1Jxnchu91yERx0mWmVL8","e3c45b10-fe0d-41c1-aa74-41f17567bbe7");
    
    console.log(this.autoInstrucao);
  }

 }

}
