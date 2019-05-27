import { Document, Collection } from './firestore/document';
import QuestaoFechada from './questaoFechada';

@Collection("alternativas")
export default class Alternativa extends Document{
  static validar(): any {
    throw new Error("Method not implemented.");
  }
  
    texto:String ;
    isVerdadeira:Boolean;
    questaoFechada:QuestaoFechada;

    constructor(id, texto, isVerdadeira, questaoFechada){
        super(id);
        this.texto = texto;
        this.isVerdadeira = isVerdadeira;
        this.questaoFechada = questaoFechada;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["questaoFechadaId"] = this.questaoFechada.pk();
        return document;
    }

    validar() {
        if (this.texto == undefined || this.texto == null || this.isVerdadeira == null || this.isVerdadeira == undefined ||
         this.questaoFechada == undefined || this.questaoFechada == null) {
          return false;
        }
        return true;
     }


   

    static validarAlternativas(alternativa: Alternativa[]) {
        for (let i = 0; i < alternativa.length; i++) {
            if (!alternativa[i].validar()) {
                return false;
            }
        }
        return true;
    }
    

   static calcularQuantasAlternativasCertas(alternativas:Alternativa[]){
        let quantDeAlternativaCerta=0;
        for(let i=0;i<alternativas.length;i++){
          if(alternativas[i].isVerdadeira== true){
           quantDeAlternativaCerta ++;
          }
        }
      return quantDeAlternativaCerta;
      }
  
}