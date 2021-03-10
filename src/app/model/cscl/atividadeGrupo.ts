import { Observable } from 'rxjs';
import { Assunto } from '../assunto';
import { Collection, date, Document, ignore } from '../firestore/document';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import Usuario from '../usuario';
import * as firebase from 'firebase';
import { Util } from '../util';
import Turma from '../turma';
import QuestaoColaborativa from './questaoColaborativa';

@Collection('atividadeGrupo')
export default class AtividadeGrupo extends Document {
  @date()
  data;
  @ignore()
  link;

  /* TODO: Criar um map para as duplas, pois na realidade é uma atividade para vários alunos que são organizados em duplas. Atualmente cada dupla vincula-se a uma atividade grupo. */

  constructor(
    id,
    public nome,
    public assunto: Assunto,
    public questao: QuestaoColaborativa,
    public dataExpiracao: Date,
    public estudantes: Usuario[],
    public turma: Turma
  ) {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();
    if (Array.isArray(this.estudantes)) {
      document['estudantes'] = [];
      this.estudantes.forEach((estudante) => {
        document['estudantes'].push(estudante.pk());
      });
    }

    document['dataExpiracao'] = firebase.firestore.Timestamp.fromDate(this.dataExpiracao);

    if (this.turma != null) {
      document['turmaCodigo'] = this.turma.codigo;
    }

    if (this.assunto != null) {
      document['assuntoId'] = this.assunto.pk();
    }

    if (this.questao != null) {
      document['questaoColaborativaId'] = this.questao.id;
    }

    return document;
  }

  gerarLink() {
    let link =  'http://localhost:4200/main/(principal:entrar-grupo/' +
    this.pk() +
    '/' +
    this["assuntoId"] +
    '/' +
    this["questaoColaborativaId"] +
    ')'
    return link
  }

  isAtivo() {
    let dataAtual = new Date();
    let isMenor = dataAtual < Util.firestoreDateToDate(this.dataExpiracao);
    return isMenor;
  }

  static criarGrupos(
    estudantes: Usuario[],
    dataExpiracao,
    assunto,
    questaoColaborativa: QuestaoColaborativa,
    turma: Turma,
    estudantesPorGrupo = 2
  ) {
    let grupos: AtividadeGrupo[] = [];
    let totalGrupos = Math.floor(estudantes.length / estudantesPorGrupo);

    // Gera um número aleatpório para definir em qual grupo o estudante será alocado
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // Identifica os grupos disponíveis a partir da quantidade de estudantes que possuem
    function gruposDisponiveis(): any[] {
      let gruposDisponiveis = [];
      for (let i = 0; i < grupos.length; i++) {
        if (grupos[i].estudantes.length < estudantesPorGrupo) {
          gruposDisponiveis.push(i);
        }
      }

      return gruposDisponiveis;
    }

    // Modifica a posição dos estudantes no array para que os grupos sejam sempre criados de forma diferente.
    // Necessário por que o nome dos estudantes fazem com que eles sempre sejam os criadores de determinados grupos.
    // Autor: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Se número de estudantes for ímpar, então alguns grupos terão mais que 2 estudantes por grupo
    if (Array.isArray(estudantes)) {
      shuffleArray(estudantes);
      estudantes.forEach((estudante) => {
        let estudanteEmGrupo = grupos.find(function (grupo, index) {
          return grupo.estudantes.find(function (e) {
            if (estudante.pk() == e.pk()) {
              return true;
            }
          });
        });

        if (estudanteEmGrupo == null) {
          if (grupos.length < totalGrupos) {
            let atividadeGrupo = new AtividadeGrupo(
              null,
              questaoColaborativa.questao.nomeCurto,
              assunto,
              questaoColaborativa,
              dataExpiracao,
              [estudante],
              turma
            );
            grupos.push(atividadeGrupo);
          } else {
            let gruposComEspaco = gruposDisponiveis();
            if (gruposComEspaco.length == 0) {
              let indexGrupoAleatorio = getRandomInt(0, grupos.length - 1);
              grupos[indexGrupoAleatorio].estudantes.push(estudante);
            } else {
              let indexGrupoLivre = gruposComEspaco[getRandomInt(0, gruposComEspaco.length - 1)];
              grupos[indexGrupoLivre].estudantes.push(estudante);
            }
          }
        }
      });
    }

    return grupos;
  }

  validar() {
    if (
      this.dataExpiracao == null ||
      this.estudantes == null ||
      this.questao == null ||
      this.assunto == null
    ) {
      return false;
    }

    return true;
  }
}
