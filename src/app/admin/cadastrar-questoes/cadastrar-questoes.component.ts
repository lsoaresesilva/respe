import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import TestCase from 'src/app/model/aprendizagem/questoes/testCase';
import { MessageService } from 'primeng/api';
import QuestaoColaborativa from 'src/app/model/cscl/questaoColaborativa';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { Dificuldade } from 'src/app/model/aprendizagem/questoes/enum/dificuldade';
import { ModeloRespostaQuestao } from 'src/app/model/aprendizagem/questoes/modeloRespostaQuestao';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';

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
  isAlterar: Boolean;
  isQuestaoColaborativa: Boolean;

  algoritmoInicial;
  solucao;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.questao = new QuestaoProgramacao(null, '', '', 0, 0, [], [], [], null, []);
    this.isAlterar = false;
    this.isQuestaoColaborativa = false;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      /* this.questao.assuntoPrincipal = params['assuntoId']; */
      if (params['assuntoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          this.assunto = assunto;

          Assunto.getAll().subscribe((assuntos) => {
            this.assuntos = assuntos;
          });

          if (params['questaoId'] != undefined) {
            this.isAlterar = true;

            this.questao = assunto.getQuestaoProgramacaoById(params['questaoId']);
            this.questao.carregarConceitos();
            // Preparar os dados de questão para serem exibidos na interface da forma adequada
            if (this.questao.solucao != null && Array.isArray(this.questao.solucao.codigo)) {
              this.solucao = this.questao.solucao.codigo.join('\n');
            }

            if (this.questao.algoritmoInicial != null) {
              this.algoritmoInicial = this.questao.algoritmoInicial.join('\n');
            }

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

  async cadastrar() {
    this.questao.ordem =
      this.questao.ordem !== 0 ? this.questao.ordem : await this.assunto.getUltimaSequencia();

    if (typeof this.algoritmoInicial === 'string' && this.algoritmoInicial !== '') {
      this.questao.algoritmoInicial = this.algoritmoInicial.split('\n');
    }

    if (typeof this.solucao === 'string' && this.solucao !== '') {
      let codigo = this.solucao.split('\n');
      this.questao.solucao = new ModeloRespostaQuestao(null, codigo, true);
    }

    if (this.questao.assuntos != null) {
      this.questao.assuntos = this.questao.assuntos.map((assunto) => {
        if (typeof assunto === 'string') {
          return new Assunto(assunto, null);
        }
        return assunto;
      });
    }

    if (this.questao.validar()) {
      if (this.isQuestaoColaborativa) {
        let questaoColaborativa = new QuestaoColaborativa(null, this.questao, null);
        if (this.assunto.questoesColaborativas == null) {
          this.assunto.questoesColaborativas = [];
        }

        this.assunto.questoesColaborativas.push(questaoColaborativa);
      } else {
        if (this.assunto.questoesProgramacao == null) {
          this.assunto.questoesProgramacao = [];
        }

        if (this.isAlterar === false) {
          this.assunto.questoesProgramacao.push(this.questao);
        }
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
