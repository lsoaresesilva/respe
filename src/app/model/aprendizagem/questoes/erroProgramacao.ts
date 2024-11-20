import { Collection, Document } from "../../database/document";
@Collection('errorespostaprogramacao')
export default class ErroProgramacao extends Document{


    constructor(public linha, public mensagem, public categoria){
        super(null);
    }
  
  
  
    getMensagemAmigavel(){
      return `Há um problema no seu código na linha ${this.linha}: ${this.mensagem}`
    }
  }