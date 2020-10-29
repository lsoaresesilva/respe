import ArrayUtilities from 'src/app/util/arrayUtilities';
import { Collection, Document } from '../firestore/document';
import { OrientacaoParson } from './enum/orientacaoParson';

@Collection('parsonProblems')
export default class ParsonProblem extends Document {
  constructor(
    id,
    public segmentos,
    public enunciado,
    public nomeCurto,
    public algoritmoInicial,
    public algoritmo,
    public sequenciaCorreta,
    public orientacao: OrientacaoParson = OrientacaoParson.vertical
  ) {
    super(id);
  }

  isSequenciaCorreta() {
    const sequenciaAlgoritmo = [];
    this.algoritmo.forEach((segmento) => {
      sequenciaAlgoritmo.push(segmento.sequencia);
    });

    return ArrayUtilities.equals(sequenciaAlgoritmo, this.sequenciaCorreta);
  }
}
