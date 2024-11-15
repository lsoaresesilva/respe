import { Collection, Document } from "../../firestore/document";
import { Util } from "../../util";


@Collection("segmentoparson")
export default class SegmentoParson extends Document {
  constructor(pk, public conteudo, public sequencia) {
    super(pk);
  }

  static construirMultiplos(segmentos: any[]) {
    const objetos: SegmentoParson[] = [];

    if (segmentos != null) {
      segmentos.forEach((segmento) => {
        objetos.push(
          this.dataToObject(segmento)
        );
      });
    }

    return objetos;
  }

  static dataToObject(segmento: any): SegmentoParson {


    return new SegmentoParson(
      segmento.primary_key,
      segmento.conteudo,
      segmento.sequencia
    );
  }
}
