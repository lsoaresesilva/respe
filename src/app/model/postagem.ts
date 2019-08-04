import { Collection, Document } from './firestore/document';


@Collection("postagens")
export default class Postagem extends Document{
    titulo:String;
    texto:String;
    estudanteId:String;
    turmaId:String;
    dataCriacao:Date;
    

    constructor(public id, titulo,texto,estudanteId,turmaId,dataCriacao){
        super(id);
        this.titulo=titulo;
        this.texto=texto;
        this.estudanteId=estudanteId;
        this.turmaId=turmaId;
        this.dataCriacao=dataCriacao;
        
       
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