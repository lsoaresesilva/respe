import { Collection, Document } from "../../database/document";
import { Util } from "../../util";
import SegmentoParson from "./segmentoParson";


@Collection("segmentorepostaestudante")
export default class SegmentoRespostaParson extends Document {
  constructor(pk, public conteudo, public sequencia, public segmento) {
    super(pk);
  }

  static construirMultiplos(segmentos: any[]) {
    const objetos: SegmentoRespostaParson[] = [];

    if (segmentos != null) {
      segmentos.forEach((segmento) => {
        objetos.push(
          this.dataToObject(segmento)
        );
      });
    }

    return objetos;
  }

  static dataToObject(segmento: any): SegmentoRespostaParson {


    return new SegmentoRespostaParson(
      segmento.primary_key,
      segmento.conteudo,
      segmento.sequencia,
      new SegmentoParson(segmento.segmento, "", "")
    );
  }
}
