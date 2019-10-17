import { Collection, Document, date } from './firestore/document';


@Collection("materialDidatico")
export default class Postagem extends Document{
    nomeArquivo:String;
    urlDownload: String;
    usuarioId:String;
    turmaId:String;
    

    constructor(public id, nomeArquivo, urlDownload, usuarioId, turmaId){
        super(id);
        this.nomeArquivo=nomeArquivo;
        this.urlDownload=urlDownload;
        this.usuarioId=usuarioId;
        this.turmaId=turmaId;
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        return document;
    }



  
    validar() {
        if (this.nomeArquivo == null || this.nomeArquivo == "" || this.urlDownload == null || this.urlDownload == "" || 
            this.usuarioId == null || this.usuarioId == "" ||  this.turmaId== null || this.turmaId == "" 
            ){
          return false;
        }
        return true;
      
      }

    
}