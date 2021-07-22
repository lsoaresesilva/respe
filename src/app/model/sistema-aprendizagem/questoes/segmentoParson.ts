import { Util } from '../../util';

export default class SegmentoParson {
  constructor(public id, public conteudo, public sequencia) {
    if (id == null) {
      this.id = Util.uuidv4();
    }
  }
}
