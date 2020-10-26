import { Collection, date, Document } from '../firestore/document';

@Collection('visualizacoesQuestoes')
export default class VisualizacaoQuestao extends Document {
  @date()
  data;

  constructor(id, public estudante, public questao, public assunto) {
    super(id);
  }

  objectToDocument() {
    if (
      this.estudante != null &&
      this.estudante.pk() != null &&
      this.questao != null &&
      this.questao.id != null &&
      this.assunto != null &&
      this.assunto.pk() != null
    ) {
      const document = super.objectToDocument();

      document['estudanteId'] = this.estudante.pk();
      document['questaoId'] = this.questao.id;
      document['assuntoId'] = this.assunto.pk();

      return document;
    }

    throw new Error('Faltam dados para salvar uma visualização de questão');
  }
}
