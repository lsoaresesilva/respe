import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { Dificuldade } from 'src/app/model/dificuldade';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from '../../model/assunto';
import TestCase from 'src/app/model/testCase';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-cadastrar-questoes',
  templateUrl: './cadastrar-questoes.component.html',
  styleUrls: ['./cadastrar-questoes.component.css']
})
export class CadastrarQuestoesComponent implements OnInit {

  assunto?;
  questao?;
  dificuldades: SelectItem[];
  assuntos;
  isAlterar:Boolean;
  
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
    this.questao = new Questao(null, "", "", 0, 0, [], []);

  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {
        this.questao.assuntoPrincipal=params["assuntoId"];
        if (params["assuntoId"] != undefined) {
          this.isAlterar=true;
          Assunto.get(params["assuntoId"]).subscribe(assunto => {
            this.assunto = assunto;

            if (params["questaoId"] != undefined) {
              this.questao = assunto["getQuestaoById"](params["questaoId"]);
            }
          })

        }else{
          throw new Error("Não é possível criar uma questão sem informar um assunto.")
        }

      });


    Assunto.getAll().subscribe(assuntos => { this.assuntos = assuntos});
   

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];
    

  }
  
  cadastrarQuestao() {
   


    if (this.questao.validar() && TestCase.validarTestsCases(this.questao.testsCases)) { 

      this.questao.assuntos = this.questao.assuntos.map(assunto =>{
        if(typeof assunto === "string")
          return new Assunto(assunto, null)
        return assunto;
      } )

      if(this.assunto.questoesProgramacao == null)
        this.assunto.questoesProgramacao = [];

      this.assunto.questoesProgramacao.push(this.questao);

      this.assunto.save().subscribe(resultado => {
       this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto',this.questao.assuntoPrincipal] } }])

      }, err => {
        this.messageErro();
        


      });
    } else {
      this.messageInformarDados();

    }

  }

  adicionarTestCase() {
    this.questao.testsCases.push(new TestCase(null, [], ""))
  }

  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.questao.nome+" foi adicionada ao banco de questões"});
  }

  messageErro() {
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'A questão não foi cadastrado'});
  }

  messageInformarDados(){
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'É preciso informar todos os campos do formulário'});
  }


  
 
}


