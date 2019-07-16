import { Collection, Document } from './firestore/document';
import { Questao } from './questao';
import Query from './firestore/query';


@Collection("modeloRespostaQuestao")
export class ModeloRespostaQuestao extends Document{
    questao:Questao;
    codigo:String
    

    constructor(public id, codigo,questao){
        super(id);
        this.codigo=codigo;
        this.questao=questao;
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        return document;
    }



    verificaModeloExiste():Boolean {
        let quantdeModelos:Number;
        console.log(this.questao);
        ModeloRespostaQuestao.getAll(new Query ("questaoId", "==", this.questao)).subscribe(modeloResultado=>{ 
           quantdeModelos= modeloResultado.length

            if(quantdeModelos != 0){
                 return false;
            }
        });
     return true;
      
    }

    validar() {
        if (this.codigo == null || this.codigo == "" ||
          this.questao == null || this.questao == undefined || this.verificaModeloExiste() === false){
          return false;
        }
        return true;
      
      }

    
}