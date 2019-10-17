import { Collection, Document } from './firestore/document';



@Collection("materialDidatico")
export class MaterialEnviado extends Document{
     id :String;
     nomeArquivo: String;
     urlDownload: String;
     usuarioId;
     turmaId;
     descricao: String;
    

    constructor(id, nomeArquivo, urlDownload,usuarioId,turmaId, descricao){
        super(id);
        this.nomeArquivo = nomeArquivo;
        this.urlDownload = urlDownload;
        this.usuarioId = usuarioId;
        this.turmaId = turmaId;
        this.descricao = descricao;
       
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        return document;
    }



    
    validar() {
        if (this.nomeArquivo == null || this.urlDownload == null ||
          this.usuarioId == null || this.turmaId == undefined || this.descricao == null){
          return false;
        }
        return true;
      
      }

    
}