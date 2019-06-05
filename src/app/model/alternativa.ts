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

    objectToDocument() {
      let document = {}
      document["texto"] = this.texto;
      document["id"] = this.id;
      document["isVerdadeira"] = this.isVerdadeira;

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
  
      /**
     * Constrói objetos alterntivas a partir do atributo alterntivas de uma questão (que é um array)
     * @param  alternativas 
     */
    static construir(alternativas:any[]){
      let objetosAlternativas:Alternativa[] = [];

      if(alternativas != null){
          alternativas.forEach(alternativa=>{
              objetosAlternativas.push(new Alternativa(alternativa.id, alternativa.texto, alternativa.isVerdadeira,alternativa.questaoFechada));
          })
      }

      

      return  alternativas;
  }

}