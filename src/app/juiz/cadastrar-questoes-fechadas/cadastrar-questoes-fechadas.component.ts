import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Assunto } from 'src/app/model/assunto';
import { Dificuldade } from 'src/app/model/dificuldade';
import Alternativa from 'src/app/model/alternativa';

@Component({
  selector: 'app-cadastrar-questoes-fechadas',
  templateUrl: './cadastrar-questoes-fechadas.component.html',
  styleUrls: ['./cadastrar-questoes-fechadas.component.css']
})
export class CadastrarQuestoesFechadasComponent implements OnInit {
  

  assunto?;
  questao?;
  dificuldades: SelectItem[];
  assuntos;
  isAlterar:Boolean=false;
  
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
   

  }

  ngOnInit() {
    
    this.questao = new QuestaoFechada(null, "", "", 0, null, []);


    this.activatedRoute.params
      .subscribe(params => {
        
        this.questao.assuntoPrincipal=params["assuntoId"];
        if (params["assuntoId"] != undefined) {
          Assunto.get(params["assuntoId"]).subscribe(assunto => {
            this.assunto = assunto;

            if (params["questaoId"] != undefined) {
            this.isAlterar=true;
              assunto["questoesFechadas"].forEach(questao => {
                if (questao.id == params["questaoId"]) {
                  this.questao = questao;
                  
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


      if(this.assunto.questoesFechadas == null)
        this.assunto.questoesFechadas = [];

      if(this.isAlterar==false){
        this.assunto.questoesFechadas.push(this.questao);
      } 
     
      this.assunto.save().subscribe(resultado => {
        
       this.router.navigate(["main", { outlets: { principal: ['visualizacao-assunto',this.assunto.pk()] } }])

      }, err => {
        this.messageErro();
        console.log(err);
        


      });
    } else {
      this.messageInformarDados();

    }

  }

  adicionarAlternativa() {
    this.questao.alternativas.push(new Alternativa(null, null, false))
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