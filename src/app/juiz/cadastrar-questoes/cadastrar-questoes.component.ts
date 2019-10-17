import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { Dificuldade } from 'src/app/model/enums/dificuldade';
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
  isAlterar:Boolean=false;
  x: string[] = ['5pC18pGdOEao1nzvvd55','e4J7VID1wSHMPmV7pTai'];
  
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
    this.questao = new Questao(null, "", "", 0, 0, [], [],null);

  }

  ngOnInit() {


    this.activatedRoute.params
      .subscribe(params => {

        console.log(params["assuntoId"]);
        console.log(params["questaoId"]);
        this.questao.assuntoPrincipal=params["assuntoId"];
        if (params["assuntoId"] != undefined) {
          Assunto.get(params["assuntoId"]).subscribe(assunto => {
            this.assunto = assunto;

            if (params["questaoId"] != undefined) {
            this.isAlterar=true;
              assunto["questoesProgramacao"].forEach(questao => {
                if (questao.id == params["questaoId"]) {
                  this.questao = questao;
                  
                  if (this.questao.assuntos != null && this.questao.assuntos.length > 0) {
                    let assuntos = [];
                    this.questao.assuntos.forEach(assunto => {
                      assuntos.push(assunto.id); 
                    })
              
                    this.questao.assuntos=assuntos;
                  }
                 
                }
              });
            }
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
  
  cadastrar() {
   


    if (this.questao.validar()) { 
      this.messageCadastro();

      this.questao.assuntos = this.questao.assuntos.map(assunto =>{
        if(typeof assunto === "string")
          return new Assunto(assunto, null)
        return assunto;
      } )

      if(this.assunto.questoesProgramacao == null)
        this.assunto.questoesProgramacao = [];

      if(this.isAlterar==false){
        console.log(this.isAlterar);
        this.assunto.questoesProgramacao.push(this.questao);
      } 
      console.log(this.isAlterar);
      this.assunto.save().subscribe(resultado => {
        
       this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto',this.assunto.pk()] } }])

      }, err => {
        this.messageErro(err);
        console.log(err);
        


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

  messageErro(err) {
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: err});
  }

  messageInformarDados(){
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'É preciso informar todos os campos do formulário'});
  }


  
 
}