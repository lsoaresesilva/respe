import { Collection, date, Document } from "../firestore/document";
import Usuario from "../usuario";

@Collection('registroMensagemChatbot')
export default class RegistroMensagemChatbot extends Document {

    @date()
    data;

    constructor(id, public mensagem, public estudante:Usuario){
        super(id);
    }

    

    objectToDocument(){
        let objeto = super.objectToDocument();
    
        

        if(this.estudante != null && this.estudante.pk() != null){
            objeto["estudanteId"] = this.estudante.pk();
        }
        
    
    
        return objeto;
        
      }
}