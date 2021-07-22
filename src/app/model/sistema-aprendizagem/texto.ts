import { Assunto } from "./assunto";
import { MaterialAprendizagem } from "./materialAprendizagem";

export default class Texto implements MaterialAprendizagem{

    constructor(public id, public nomeCurto, public texto, public ordem, public assunto){

    }

}