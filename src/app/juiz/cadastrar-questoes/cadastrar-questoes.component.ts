import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { Dificuldade } from 'src/app/model/dificuldade';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from '../../model/assunto';
import TestCase from 'src/app/model/testCase';
import { MessageService } from 'primeng/api';

;


@Component({
  selector: 'app-cadastrar-questoes',
  templateUrl: './cadastrar-questoes.component.html',
  styleUrls: ['./cadastrar-questoes.component.css']
})
export class CadastrarQuestoesComponent implements OnInit {

  questao;
  dificuldades: SelectItem[];
  assuntos;
   

    

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
   

  }

  ngOnInit() {

    this.questao = new Questao(null, null, null, null, null, [], null, []);

    this.activatedRoute.params
      .subscribe(params => {
        if (params["id"] != undefined) {
          Questao.get(params["id"]).subscribe(questao => {
            this.questao = questao;
          })
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

  adicionarTestCase() {
    this.questao.testsCases.push(new TestCase(null, [], "", this.questao))
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
  
  cadastrarQuestao() {
   
    if (this.questao.validar() && TestCase.validarTestsCases(this.questao.testsCases)) {

    
      this.questao.assunto = this.questao.assuntos.map(assunto =>{
        if(typeof assunto === "string")
          return new Assunto(assunto, null, null, null, null)
        return assunto;
      } )

      this.questao.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-questoes'] } }])
        console.log("cadastrado");

      }, err => {
      this.messageErro();

      });
    } else {
      this.messageInformarDados();

      console.log(TestCase.validarTestsCases(this.questao.testsCases)+""+ this.questao.testsCases);
      alert("falta dados");
     

    }

  }


  
 
}






