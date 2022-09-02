import { Document, Collection, date } from '../firestore/document';
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import Usuario from '../usuario';
import { NivelConfianca } from '../nivelConfianca';
import { ObjetivosExercicios } from '../enums/objetivosExercicios';
import { Motivacao } from '../enums/motivacao';
import { CategoriaPergunta } from '../diario/categoriaPergunta';

export class ReflexaoAprendizagem {
  mudarHorarioEstudos: boolean = false;
  buscarNovasFormasEstudos: boolean = false;
  dedicarMaisTempo: boolean = false;
  reverMaterialAula: boolean = false;
  reduzirDistracoes: boolean = false;
  metasRealistas: boolean = false;

  objectToDocument() {
    return {
      mudarHorarioEstudos: this.mudarHorarioEstudos,
      buscarNovasFormasEstudos: this.buscarNovasFormasEstudos,
      dedicarMaisTempo: this.dedicarMaisTempo,
      reverMaterialAula: this.reverMaterialAula,
      reduzirDistracoes: this.reduzirDistracoes,
      metasRealistas: this.metasRealistas
    };
  }
}

@Collection('diarios')
export default class Diario extends Document {
  constructor(
    id,
    public reflexao: ReflexaoAprendizagem,
    public planejamento,
    public nivelConfianca: NivelConfianca,
    public tempoEstudo,
    public objetivoExercicio: ObjetivosExercicios,
    public motivacao: Motivacao,
    public estudante
  ) {
    super(id);
  }
  @date()
  data;

  static possuiDiarioAtualizado(diarios) {
    // Pegar todos os diários

    if (Array.isArray(diarios) && diarios.length > 0) {
      // Verificar se a data do último foi de 7 dias atrás
      const diarioRecente = Diario.getRecente(diarios);
      const semanaAtras = new Date();
      const diffTime = semanaAtras.getTime() - diarioRecente['data'].toDate().getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
      if (diffDays >= 7) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static getRecente(diarios) {
    let recente = null;
    if (Array.isArray(diarios) && diarios.length > 0) {
      recente = diarios.sort((a, b) => b.data - a.data);
      if (recente.length > 0) {
        return recente[0];
      }
    }

    return recente;
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['reflexao'] = this.reflexao.objectToDocument();
    return document;
  }

  validar(primeiraSemana = false) {
    if (
      this.nivelConfianca != null &&
      this.objetivoExercicio != null &&
      this.motivacao != null &&
      this.tempoEstudo != null
    ) {
      return true;
    }

    return false;
  }
}
