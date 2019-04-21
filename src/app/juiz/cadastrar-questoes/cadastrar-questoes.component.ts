import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { Dificuldade } from 'src/app/model/dificuldade';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from '../../model/assunto';

;


@Component({
  selector: 'app-cadastrar-questoes',
  templateUrl: './cadastrar-questoes.component.html',
  styleUrls: ['./cadastrar-questoes.component.css']
})
export class CadastrarQuestoesComponent implements OnInit {

questao:Questao;
dificuldades: SelectItem[];
assuntos;


  constructor( private router: Router,private route: ActivatedRoute) { 
    // private messageService: MessageService,
    
  }
   
  ngOnInit() {
 
    
   this.questao = new Questao(null,null,null,null,null,[],null);
    Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});
  

    this.dificuldades=[
      {label:'Selecione uma dificuldade', value:null},
      {label:'Difícil', value: Dificuldade.dificil},
      {label:'intermediário', value: Dificuldade.medio},
      {label:'Facíl', value:Dificuldade.facil},
    ];
    this.assuntos=[
      {label:'selecione o assunto principal',value:null}
    ]
    

  }

  cadastrarQuestao(){
   console.log("esse é o nome = "+this.questao.nomeCurto);
   console.log("esse é o enunciado = "+this.questao.enunciado);
   console.log("esse é o assuntoPrincipal = "+this.questao.assuntoPrincipal);
   console.log("esse é a dificuldade = "+this.questao.dificuldade);
   console.log("esse são os assuntos = "+ this.questao.assuntos);
   console.log("esse é a sequencia = "+this.questao.sequencia);
   console.log("esse é a sequencia = "+this.questao.pk());
 
   if(this.questao){
      this.questao.save().subscribe(resultado=>{
        console.log("cadastrado");
      
    }, err=>{
      console.log("deu erro")
      
      });
    }else{
      console.log("vazio")
     
    }
  }


 
}
  

    
 


