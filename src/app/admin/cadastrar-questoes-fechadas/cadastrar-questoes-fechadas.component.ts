import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService, MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Dificuldade } from '../../model/aprendizagem/questoes/enum/dificuldade';
import Alternativa from '../../model/aprendizagem/questoes/alternativa';
import QuestaoFechada from '../../model/aprendizagem/questoes/questaoFechada';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';

@Component({
  selector: 'app-cadastrar-questoes-fechadas',
  templateUrl: './cadastrar-questoes-fechadas.component.html',
  styleUrls: ['./cadastrar-questoes-fechadas.component.css'],
})
export class CadastrarQuestoesFechadasComponent implements OnInit {
  assunto?:Assunto;
  questao?:QuestaoFechada;
  dificuldades: SelectItem[];
  assuntos;
  isAlterar: Boolean = false;
  items: MenuItem[];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {


    this.questao = new QuestaoFechada(null, '', '', 0, [], [], '', null, 0);

    this.activatedRoute.params.subscribe((params) => {
      if (params['assuntoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          let menuItems = [];
          this.assunto = assunto;
          menuItems.push(
            {label:this.assunto.nome, command:(click)=>{this.router.navigate([
              'geral/main',
              { outlets: { principal: ['admin', 'visualizar-assunto-admin', assunto.pk()] } },
            ]);}}
          )
          if (params['questaoId'] != undefined) {
            this.isAlterar = true;
            this.questao = assunto.getQuestaoFechadaById(params['questaoId']);
            this.questao.carregarConceitos();
            menuItems.push(
              {label:this.questao.nomeCurto},
              {label:"Alterar questão"}
            )
            this.items = menuItems;
          }
        });
      }
    });

    Assunto.getAll().subscribe((assuntos) => {
      this.assuntos = assuntos;
    });

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];
  }

  alterarConceitos(conceitos){
    this.questao.conceitos = conceitos;
  }

  async cadastrar() {
    this.questao.ordem =
      this.questao.ordem !== 0 ? this.questao.ordem : await this.assunto.getUltimaSequencia();

    if (this.questao.validar()) {


      if (this.assunto.questoesFechadas == null) {
        this.assunto.questoesFechadas = [];
      }

      if (this.isAlterar == false) {
        this.assunto.questoesFechadas.push(this.questao);
      }

      this.assunto.save().subscribe(
        (resultado) => {
          this.messageCadastro();
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['admin', 'visualizar-assunto-admin', this.assunto.pk()] } },
          ]);
        },
        (err) => {
          this.messageErro();
        }
      );
    } else {
      this.messageInformarDados();
    }
  }

  adicionarAlternativa() {
    this.questao.alternativas.push(new Alternativa(null, null, false));
  }

  messageCadastro() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Questão cadastrada com sucesso',
    });
  }

  messageErro() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Houve uma falha no cadastro da questão. Por favor, tente novamente.',
    });
  }

  messageInformarDados() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'É preciso informar todos os campos do formulário',
    });
  }
}
