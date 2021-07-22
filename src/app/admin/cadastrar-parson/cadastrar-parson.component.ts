import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Assunto } from 'src/app/model/assunto';
import { Dificuldade } from 'src/app/model/enums/dificuldade';
import { OrientacaoParson } from 'src/app/model/sistema-aprendizagem/questoes/enum/orientacaoParson';
import QuestaoParsonProblem from 'src/app/model/sistema-aprendizagem/questoes/questaoParsonProblem';

@Component({
  selector: 'app-cadastrar-parson',
  templateUrl: './cadastrar-parson.component.html',
  styleUrls: ['./cadastrar-parson.component.css'],
})
export class CadastrarParsonComponent implements OnInit {
  assunto?: Assunto;
  questao?: QuestaoParsonProblem;
  isAlterar;
  dificuldades: SelectItem[];
  orientacoes: SelectItem[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.questao = new QuestaoParsonProblem(null, [], '', 0, Dificuldade.facil, [], [], [], []);
    this.isAlterar = false;
    this.activatedRoute.params.subscribe((params) => {
      if (params['assuntoId'] !== undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          this.assunto = assunto;

          if (params['questaoId'] != undefined) {
            this.isAlterar = true;
            assunto['questoesParson'].forEach((questao) => {
              if (questao.id == params['questaoId']) {
                this.questao = questao;
              }
            });
          }
        });
      }
    });

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];

    this.orientacoes = [
      { label: 'Selecione uma orientacao', value: null },
      { label: 'Vertical', value: OrientacaoParson.vertical },
      { label: 'Horizontal', value: OrientacaoParson.horizontal },
    ];
  }

  cadastrar() {
    // TODO: Migrar isso para dentro do model Questao
    this.questao.ordem =
      this.questao.ordem !== 0 ? this.questao.ordem : this.assunto.getUltimaSequencia();

    // TODO: migrar isso para dentro do save de assunto. Ele quem deve organizar o salvamento de suas questões.
    this.questao.prepararParaSave();

    if (this.questao.validar()) {
      this.messageCadastro();

      if (this.assunto.questoesFechadas == null) {
        this.assunto.questoesFechadas = [];
      }

      if (this.isAlterar == false) {
        this.assunto.questoesParson.push(this.questao);
      }

      this.assunto.save().subscribe(
        (resultado) => {
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['visualizar-assunto-admin', this.assunto.pk()] } },
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
