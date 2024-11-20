import { Observable } from 'rxjs';
import { Collection, date, Document } from '../../database/document';
import Query from '../../database/query';
import QuestaoParsonProblem from './questaoParsonProblem';
import Usuario from '../../usuario';
import SegmentoRespostaParson from './segmentoRespostaParson';
import SegmentoParson from './segmentoParson';

@Collection('respostaquestaoparson')
export class RespostaQuestaoParson extends Document {
  constructor(
    public id,
    public estudante: Usuario,
    public segmentos,
    public questao: QuestaoParsonProblem
  ) {
    super(id);
  }
  @date()
  data;

  objectToDocument() {
    const document = super.objectToDocument();
    document['questao_id'] = this.questao.pk;

    if (Array.isArray(this.segmentos)) {
      document['segmentos'] = this.segmentos.map((segmento) => {
        return { segmento_id: segmento.pk, sequencia: segmento.sequencia };
      });
    }

    return document;
  }

  getSequenciaResposta(){
    return this.segmentos.map((segmento) => segmento.sequencia)
  }

  static dataToObject(data: any) {
    const objeto: RespostaQuestaoParson = new RespostaQuestaoParson(
      data.primary_key,
      data.estudante,
      data.segmentos,
      data.questao
    )


    return objeto;
  }

  prepararSegmentos(questao){
    
    this.segmentos = this.segmentos.map((segmento) => {
      const segmentoQuestao = questao.segmentos.find((segmentoQuestao) => {
        return segmentoQuestao.pk == segmento.segmento
      }); 
      return new SegmentoRespostaParson(segmento.primary_key, segmentoQuestao.conteudo, segmento.sequencia, new SegmentoParson(segmento.segmento, "", 0));
    })

    const primaryKeysSet = new Set(this.segmentos.map(item => item.segmento.pk));

    questao.segmentos = questao.segmentos.filter((segmento) => {
      return !primaryKeysSet.has(segmento.pk)
    });
  }
}
