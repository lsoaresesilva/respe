import { Collection, Document, date } from '../firestore/document';
import Usuario from '../usuario';
import { ModeloRespostaQuestao } from '../modeloRespostaQuestao';
import Query from '../firestore/query';
import { QuestaoProgramacao } from './questaoProgramacao';

@Collection('visualizacaoRespostasQuestoes')
export class VisualizacaoRespostasQuestoes extends Document {
  @date()
  data;

  constructor(public id, public estudante: Usuario, public questao: QuestaoProgramacao) {
    super(id);
  }

  static getByEstudante(questao: QuestaoProgramacao, estudante: Usuario) {
    return super.getByQuery([
      new Query('estudanteId', '==', estudante.pk()),
      new Query('questaoId', '==', questao.id),
    ]);
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['questaoId'] = this.questao.id;
    return document;
  }
}
