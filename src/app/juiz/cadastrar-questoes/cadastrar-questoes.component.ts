import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { Dificuldade } from 'src/app/model/dificuldade';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from '../../model/assunto';
import TestCase from 'src/app/model/testCase';

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
   

    assuntos2: string[] = ['', 'variaveis','array','Finance'];

    

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // private messageService: MessageService,

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


  cadastrarQuestao() {

    if (this.questao.validar()) {

    
      this.questao.assuntos = this.questao.assuntos.map(assunto =>{
        if(typeof assunto === "string")
          return new Assunto(assunto, null)
        return assunto;
      } )

      this.questao.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-questao'] } }]);

      }, err => {
       alert("Falha ao cadastrar questão: "+err.toString())

      });
    } else {
      // TODO: mudar para o message service
      alert("É preciso informar todos os campos do formulário");
    }



  }




}






