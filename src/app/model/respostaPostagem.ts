import { Collection, Document } from './firestore/document';


@Collection("respostasPostagens")
export default class RespostaPostagem extends Document{
   
    texto:String;
    postagemId:String;
    dataCriacao:Date;
    estudanteId:String;
    

    constructor(public id,texto,postagemId,dataCriacao,estudanteId){
        super(id);
        this.texto=texto;
        this.postagemId=postagemId;
        this.dataCriacao=dataCriacao;
        this.estudanteId=estudanteId;
        
    }

   objectToDocument(){
        let document = super.objectToDocument()
        return document;
    }



  
    validar() {
        if ( this.texto == null || this.texto == "" || this.postagemId == null || this.postagemId == undefined || 
            this.estudanteId == null || this.estudanteId == undefined  ){
          return false;
        }
        return true;
      
      }

    
}