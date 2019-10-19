import { Collection, Document, date } from './firestore/document';


@Collection("respostasPostagens")
export default class RespostaPostagem extends Document{
   
    texto:String;
    postagemId:String;
    estudanteId:String;
    @date()
    dataCriacao:Date;
    

    constructor(public id,texto,postagemId,estudanteId){
        super(id);
        this.texto=texto;
        this.postagemId=postagemId;
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