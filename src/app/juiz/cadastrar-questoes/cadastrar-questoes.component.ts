import { Component, OnInit } from '@angular/core';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import { Dificuldade } from 'src/app/model/enums/dificuldade';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from '../../model/assunto';
import TestCase from 'src/app/model/testCase';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-questoes',
  templateUrl: './cadastrar-questoes.component.html',
  styleUrls: ['./cadastrar-questoes.component.css'],
})
export class CadastrarQuestoesComponent implements OnInit {
  assunto?: Assunto;
  questao?: QuestaoProgramacao;
  dificuldades: SelectItem[];
  assuntos;
  isAlterar: Boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.questao = new QuestaoProgramacao(null, '', '', 0, 0, [], [], [], null);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      /* this.questao.assuntoPrincipal = params['assuntoId']; */
      if (params['assuntoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          this.assunto = assunto;

          if (params['questaoId'] != undefined) {
            this.isAlterar = true;
            assunto['questoesProgramacao'].forEach((questao) => {
              if (questao.id == params['questaoId']) {
                this.questao = questao;

                this.questao.formatarAlgoritmoInicial();

                if (this.questao.assuntos != null && this.questao.assuntos.length > 0) {
                  const assuntos = [];
                  this.questao.assuntos.forEach((assunto) => {
                    assuntos.push(assunto.id);
                  });

                  this.questao.assuntos = assuntos;
                }
              }
            });
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

  cadastrar() {
    this.questao.sequencia =
      this.questao.sequencia !== 0 ? this.questao.sequencia : this.assunto.getUltimaSequencia();

    if (typeof this.questao.algoritmoInicial === 'string') {
      this.questao.algoritmoInicial = this.questao.algoritmoInicial.split('\n');
    }

    if (this.questao.validar()) {
      if (this.isAlterar == false) {
        this.assunto.questoesProgramacao.push(this.questao);
      }

      if (this.questao.assuntos != null) {
        this.questao.assuntos = this.questao.assuntos.map((assunto) => {
          if (typeof assunto === 'string') {
            return new Assunto(assunto, null);
          }
          return assunto;
        });
      }

      if (this.assunto.questoesProgramacao == null) {
        this.assunto.questoesProgramacao = [];
      }

      this.assunto.save().subscribe(
        (resultado) => {
          this.messageCadastro();
          this.router.navigate([
            'main',
            { outlets: { principal: ['visualizar-assunto-admin', this.assunto.pk()] } },
          ]);
        },
        (err) => {
          this.messageErro(err);
        }
      );
    } else {
      this.messageInformarDados();
    }
  }

  adicionarTestCase(isArray) {
    if (!isArray) {
      this.questao.testsCases.push(new TestCase(null, [], ''));
    } else {
      this.questao.testsCases.push(new TestCase(null, [], []));
    }
  }

  messageCadastro() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cadastrado!',
      detail: 'Questão armazenada com sucesso',
    });
  }

  messageErro(err) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Falha ao cadastrar questão',
      detail: err,
    });
  }

  messageInformarDados() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Falha ao cadastrar questão',
      detail: 'É preciso informar todos os campos do formulário',
    });
  }
}
