import { Collection, Document, date } from './firestore/document';


@Collection("postagens")
export default class Postagem extends Document{
    titulo:String;
    texto:String;
    estudanteId:String;
    turmaId:String;
    @date()
    dataCriacao:Date;
    

    constructor(public id, titulo,texto,estudanteId,turmaId){
        super(id);
        this.titulo=titulo;
        this.texto=texto;
        this.estudanteId=estudanteId;
        this.turmaId=turmaId;
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        return document;
    }



  
    validar() {
        if (this.titulo == null || this.titulo == "" || this.texto == null || this.texto == "" || 
            this.estudanteId == null || this.estudanteId == "" ||  this.turmaId== null || this.turmaId == "" 
            ){
          return false;
        }
        return true;
      
      }

    
}