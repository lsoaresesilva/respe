import { Component, OnInit } from '@angular/core';
import Diario, { ReflexaoAprendizagem } from 'src/app/model/srl/diario';
import { MessageService, SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';
import { ObjetivosExercicios } from 'src/app/model/enums/objetivosExercicios';
import { Motivacao } from 'src/app/model/enums/motivacao';
import Query from 'src/app/model/firestore/query';
import { CategoriaPergunta } from 'src/app/model/diario/categoriaPergunta';
import PerguntaDiario from 'src/app/model/diario/perguntaDiario';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
})
export class DiarioComponent implements OnInit {
  display;
  diario: Diario;
  niveisObjetivosExercicios: SelectItem[];
  niveisConfianca: SelectItem[];
  isPrimeiraSemana;
  motivacao: SelectItem[];
  reflexao: SelectItem[];

  perguntas: Map<CategoriaPergunta, Map<number, PerguntaDiario>>;

  hintPlanejamento;
  hintReflexao;

  constructor(private login: LoginService, private messageService: MessageService) {
    this.diario = new Diario(null, new ReflexaoAprendizagem(), '', null, null, null, null, this.login.getUsuarioLogado());
    this.display = false;
    this.isPrimeiraSemana = false;
    this.inicializarPerguntas();
    this.getHints();
  }

  inicializarPerguntas() {
    this.perguntas = new Map<CategoriaPergunta, Map<number, PerguntaDiario>>();

    let hintsPlanejamentos = new Map();

    let perguntaPlanejamentoUm = hintsPlanejamentos.set(
      1,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'Como você pensou em estudar essa semana? É importante planejar uma quantidade de horas por semana, definir horários, preparar os materiais que vai precisar e definir objetivos (e.g., quantos exercícios espera resolver essa semana?)',
        1
      )
    );
    let perguntaPlanejamentoDois = hintsPlanejamentos.set(
      2,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'Você consegue pensar o que é necessário para tornar seu estudo produtivo? Revise um passo a passo e tente seguir seu planejamento',
        2
      )
    );
    let perguntaPlanejamentoTres = hintsPlanejamentos.set(
      3,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'Tomando suas dificuldades como ponto de partida, que melhorias podem ser feita no seu planejamento para que você tenha uma semana de estudo mais produtiva?',
        3
      )
    );
    let perguntaPlanejamentoQuatro = hintsPlanejamentos.set(
      4,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'Muitas vezes ao pensar em planejamento esquecemos de coisas simples como desligar o telefone, evitar distrações e escolher o melhor momento do dia. O que você pode fazer para melhorar o seu estudo?',
        4
      )
    );
    let perguntaPlanejamentoCinco = hintsPlanejamentos.set(
      5,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'O planejamento está servindo ao propósito de melhorar seus estudos? Caso não esteja, revise seu planejamento, tenha metas mais claras e realistas.',
        5
      )
    );
    let perguntaPlanejamentoSeis = hintsPlanejamentos.set(
      6,
      new PerguntaDiario(
        CategoriaPergunta.planejamento,
        'Você já consegue ver aplicar as melhores estratégias ao seu cronograma de estudo?',
        6
      )
    );

    this.perguntas.set(CategoriaPergunta.planejamento, hintsPlanejamentos);

    let hintsReflexao = new Map();

    let perguntaReflexaoUm = hintsReflexao.set(
      1,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'Como você avalia a sua última semana de estudos? Utilize esse espaço para escrever sobre o que não deu certo, mas também aquilo que você fez que lhe ajudou a melhorar no aprendizado. Refletir sobre isso é importante para melhorar seus estudos',
        1
      )
    );
    let perguntaReflexaoDois = hintsReflexao.set(
      2,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'Quais suas maiores dificuldades em executar seu planejamento? Observe suas metas.',
        2
      )
    );
    let perguntaReflexaoTres = hintsReflexao.set(
      3,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'Quais as estratégias de estudo que mais te ajudaram a executar o planejamento? Observe em que momentos as coisas pareceram estar fluindo.',
        3
      )
    );
    let perguntaReflexaoQuatro = hintsReflexao.set(
      4,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'Você tem notado melhoria no rendimento dos estudos semanais? Observe se você se sente mais confiante com a programação.',
        4
      )
    );
    let perguntaReflexaoCinco = hintsReflexao.set(
      5,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'O que tem feito que seu estudo seja produtivo ou improdutivo? Caso esteja difícil, peça ajuda, é sempre uma boa alternativa.',
        5
      )
    );
    let perguntaReflexaoSeis = hintsReflexao.set(
      6,
      new PerguntaDiario(
        CategoriaPergunta.reflexao,
        'Você alcançou as metas colocadas nesta semana de estudo? Seja realista, não se cobre mais do que precisa e revise o planejamento.',
        6
      )
    );

    this.perguntas.set(CategoriaPergunta.reflexao, hintsReflexao);
  }

  ngOnInit() {
    this.apresentarDiario();

    this.niveisConfianca = [
      { label: 'Selecione um nível de confiança', value: null },
      { label: 'Pouco confiante', value: NivelConfianca.pouco },
      { label: 'Confiante', value: NivelConfianca.normal },
      { label: 'Muito confiante', value: NivelConfianca.alto },
    ];

    this.niveisObjetivosExercicios = [
      { label: 'Selecione um objetivo', value: null },
      { label: 'de 1 a 3 exercícios', value: ObjetivosExercicios.umAtres },
      { label: 'de 4 a 6 exercícios', value: ObjetivosExercicios.quatroAseis },
      { label: 'Mais que 6 exercícios', value: ObjetivosExercicios.maisSeis },
    ];

    this.motivacao = [
      { label: 'Selecione um nível de motivação', value: null },
      { label: 'Não estou', value: Motivacao.nenhuma },
      { label: 'Pouco', value: Motivacao.pouco },
      { label: 'Normal', value: Motivacao.normal },
      { label: 'Estou motivado', value: Motivacao.motivado },
      { label: 'Estou muito motivado', value: Motivacao.muitoMotivado },
    ];
  }

  apresentarDiario() {
    Diario.getAll(new Query('estudanteId', '==', this.login.getUsuarioLogado().pk())).subscribe(
      (diarios) => {
        if (diarios.length == 0) {
          this.isPrimeiraSemana = true;
        }

        this.display = !Diario.possuiDiarioAtualizado(diarios);
      }
    );
  }

  salvar() {
    if (this.diario.validar(this.isPrimeiraSemana)) {
      this.diario.save().subscribe(
        () => {},
        () => {},
        () => {
          this.display = false;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'É preciso preencher os campos',
        detail:
          'Antes de avançar é preciso responder as perguntas. Lembre-se que nas perguntas abertas você deve escrever no mínimo 50 caracteres.',
      });
    }
  }

  contagemCaracteres(referencia: string) {
    let restante = 50 - referencia.length;
    return restante <= 0 ? 0 : restante;
  }

  getHints() {
    let hintRecente = localStorage.getItem('hintDiario');

    if (hintRecente == null) {
      this.hintPlanejamento = this.perguntas.get(CategoriaPergunta.planejamento).get(1);
      this.hintReflexao = this.perguntas.get(CategoriaPergunta.reflexao).get(1);
      localStorage.setItem('hintDiario', '2');
    } else {

      this.hintPlanejamento = this.perguntas
        .get(CategoriaPergunta.planejamento)
        .get(parseInt(hintRecente));
      this.hintReflexao = this.perguntas.get(CategoriaPergunta.reflexao).get(parseInt(hintRecente));

      let proximaSequencia = parseInt(hintRecente) + 1;

      if (proximaSequencia > 6) {
        proximaSequencia = 1;
      }



      localStorage.setItem('hintDiario', proximaSequencia.toString());
    }
  }
}
