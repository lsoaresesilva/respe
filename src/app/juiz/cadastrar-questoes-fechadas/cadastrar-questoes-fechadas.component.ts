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
  

  questao;
  dificuldades: SelectItem[];
  assuntos;
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
   

  }

  ngOnInit() {

    this.questao = new QuestaoFechada(null, null, null, null, [], null, []);

    this.activatedRoute.params
      .subscribe(params => {
        if (params["id"] != undefined) {
          QuestaoFechada.get(params["id"]).subscribe(questao => {
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

  adicionarAlternativa() {
    this.questao.alternativas.push(new Alternativa(null, null, null, this.questao))
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
    if (this.questao) {


      this.questao.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-questoes-fechadas'] } }])
        console.log("cadastrado");
        console.log(this.questao);

      }, err => {
      this.messageErro();

      });
    } else {
      this.messageInformarDados();

      alert("falta dados");
     

    }

  }


  
 
}






