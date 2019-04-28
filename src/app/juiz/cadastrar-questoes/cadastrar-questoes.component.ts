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

  questao;
  dificuldades: SelectItem[];
  assuntos;
  id;
  ehAlterar=false;


  constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    

  }

  ngOnInit() {
    this.questao = new Questao(null, null, null, null, null, [], null, []);
    Assunto.getAll().subscribe(assuntos => { this.assuntos = assuntos });
    
    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];

    
    this.assuntos = [
      { label: 'selecione o assunto principal', value: null }
    ]

   
    this.route.params.subscribe(params=> {this.id = params["id"];
      if(this.id!=undefined){
        this.ehAlterar=true;
        Questao.get(this.id).subscribe(resultado =>{
          this.questao = resultado;
          console.log("esse é o assuntoPrincipal = " + this.questao.assuntoPrincipal);
          console.log("esse são os assuntos = " + this.questao.assuntos);
          console.log("esse é os testesCases = " + this.questao.testsCases);
        })
      }
      
    });

  }

  adicionarTestCase() {
    this.questao.testsCases.push(new TestCase(null, [], "", this.questao))
  }
  

  cadastrarQuestao() {
    // console.log("esse é o nome = " + this.questao.nomeCurto);
    // console.log("esse é o enunciado = " + this.questao.enunciado);
    // console.log("esse é o assuntoPrincipal = " + this.questao.assuntoPrincipal);
    // console.log("esse é a dificuldade = " + this.questao.dificuldade);
    // console.log("esse são os assuntos = " + this.questao.assuntos);
    // console.log("esse é a sequencia = " + this.questao.sequencia);
    // console.log("esse é o id = " + this.questao.pk());
    // console.log("esse é o testsCases = " + this.questao.testsCases);

    if (this.questao) {
      this.questao.save().subscribe(resultado => {
        this.router.navigate(['/Listar/Questoes']);
        if(this.ehAlterar!= true){
          this.router.navigate(['/Listar/Questoes']);
          this.messageCadastro();
           
        


        }else{
          console.log("alterado");
          this.messageUpdate();
          this.router.navigate(['/Listar/Questoes']);
        }
      }, err => {
        console.log("deu erro")

      });
    } else {
      console.log("vazio")

    }

  }



  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.questao.nomeCurto+" foi adicionada ao banco de questões"});
  }
 

  messageUpdate() {
    this.messageService.add({severity:'warn', summary:'Alterado!', detail: this.questao.nomeCurto+" foi alterada no banco de questões"});
  }
 
  


}
