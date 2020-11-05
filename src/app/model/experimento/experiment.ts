import { Groups } from './groups';
import { ExperimentType } from './experimentType';
import { ConhecimentoProgramacao } from '../enums/conhecimentoProgramacao';
import Usuario from '../usuario';

export default class Experiment {
  constructor() {
    this.SESSION_STORAGE_NAME = 'groupExperiment';
  }
  static instance;
  static type;

  SESSION_STORAGE_NAME;

  static start(configurator) {
    if (configurator == null) {
      throw new Error('An configurator must be used.');
    }
    if (configurator.type == null) {
      throw new Error('You must inform the type of experiment.');
    }

    this.type = configurator.type;
  }

  static get() {
    if (this.instance == null) {
      return new Experiment();
    }

    return this.instance;
  }

  /**
   * Assigns a user to an group (control or experimental). Users are assigned randomly based on the quantity of users in each group.
   * //TODO: If random is set then users are assigned independent of the quantity of users in each group.
   * @param count
   * @param random
   */
  static assignToGroup(
    categories: Map<ConhecimentoProgramacao, Map<Groups, number>>,
    userCategory: ConhecimentoProgramacao
  ) {
    /* Verificar a classe ao qual o usuário pertence */
    /* Verificar qual grupo possui menos daquela categoria. Se for igual, joga aleatoriamente para um deles */
    const categoryNumbers = categories.get(userCategory);
    if (categoryNumbers.get(Groups.control) > categoryNumbers.get(Groups.experimentalA)) {
      return Groups.experimentalA;
    } else if (categoryNumbers.get(Groups.experimentalA) > categoryNumbers.get(Groups.control)) {
      return Groups.control;
    } else {
      const min = Math.ceil(0);
      const max = Math.floor(100);
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (randomNumber % 2 === 0) {
        return Groups.experimentalA;
      } else {
        return Groups.control;
      }
    }
  }

  /**
   * Assigns a user to an group (control or experimental). Users are assigned randomly based on the quantity of users in each group.
   * //TODO: If random is set then users are assigned independent of the quantity of users in each group.
   * @param count
   * @param random
   */
  static assignToGroupRandomly(count, random = null) {
    if (typeof count == 'number') {
      // todo: check if it is a integer.
      // se for do tipo controle experimento
      if (this.type == ExperimentType.controlExperiment) {
        if (count % 2 == 0) {
          // se for número par jogar no experimental
          return Groups.experimentalA;
        } else {
          // se for número ímpar jogar no controle
          return Groups.control;
        }
      } else {
        throw new Error(
          'You must provide the type property in your experiment class. It can be one of ExperimentType enumaration value.'
        );
      }
    } else {
      throw new Error('A number of users must be provided as an integer.');
    }
  }

  static construirCategoriasAlunos(estudantes: Usuario[]) {
    const categorias: Map<ConhecimentoProgramacao, Map<Groups, number>> = new Map();

    categorias.set(ConhecimentoProgramacao.nenhum, new Map<Groups, number>());
    categorias.get(ConhecimentoProgramacao.nenhum).set(Groups.control, 0);
    categorias.get(ConhecimentoProgramacao.nenhum).set(Groups.experimentalA, 0);

    categorias.set(ConhecimentoProgramacao.pouco, new Map<Groups, number>());
    categorias.get(ConhecimentoProgramacao.pouco).set(Groups.control, 0);
    categorias.get(ConhecimentoProgramacao.pouco).set(Groups.experimentalA, 0);

    categorias.set(ConhecimentoProgramacao.medio, new Map<Groups, number>());
    categorias.get(ConhecimentoProgramacao.medio).set(Groups.control, 0);
    categorias.get(ConhecimentoProgramacao.medio).set(Groups.experimentalA, 0);

    categorias.set(ConhecimentoProgramacao.programador, new Map<Groups, number>());
    categorias.get(ConhecimentoProgramacao.programador).set(Groups.control, 0);
    categorias.get(ConhecimentoProgramacao.programador).set(Groups.experimentalA, 0);

    estudantes.forEach((estudante) => {
      const categoria = categorias.get(estudante.conhecimentoPrevioProgramacao);
      const totalPorGrupo = categoria.get(estudante.grupoExperimento);
      categorias
        .get(estudante.conhecimentoPrevioProgramacao)
        .set(estudante.grupoExperimento, totalPorGrupo + 1);
    });

    return categorias;
  }

  // Pegar todos os alunos de uma turma
  // Contar quantos alunos possuem de cada categoria para cadagrupo
  // Se for um novo aluno, verifica o grupo que tem menos daquela categoria. Coloca nele
}
