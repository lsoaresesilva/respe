import { Collection, Document } from "../firestore/document";
import { Assunto } from "../questoes/assunto";
import { MaterialAprendizagem } from "./materialAprendizagem";

@Collection("textos")
export default class Texto extends Document implements MaterialAprendizagem {

    constructor(public id, public link, public nomeCurto, public assunto, public ordem){
      super(id);
    }


}
