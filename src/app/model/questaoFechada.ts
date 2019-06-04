import { Dificuldade } from './dificuldade';
import Alternativa from './alternativa';
import { Util } from './util';

export default class QuestaoFechada{

  constructor(public id, public nomeCurto, public enunciado, public dificuldade:Dificuldade, public sequencia, public alternativas: Alternativa[]) {
    if(this.id == null){
      this.id = Util.uuidv4();
  }else{
      this.id = id;
  }
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.alternativas = alternativas;
  }

    objectToDocument(){
        let document = {}
        document["nomeCurto"] = this.nomeCurto;
        document["enunciado"] = this.enunciado;
        document["dificuldade"] = this.dificuldade;
        document["sequencia"] = this.sequencia;

        if (this.alternativas != null && this.alternativas.length > 0) {
          let alternativas = [];
          this.alternativas.forEach(alternativa => {
            if(typeof alternativa.objectToDocument === "function")
              alternativas.push(alternativa.objectToDocument()); 
          })
    
          document["alternativas"] = alternativas;
        }

        return document;
    }

    /**
     * Constrói objetos a partir do atributo array de uma document
     * @param questoesFechadas 
     */
    static construir(questoesFechadas:any[]){
      let objetos:QuestaoFechada[] = [];

      if(questoesFechadas != null){
        questoesFechadas.forEach(questaoFechada=>{
          objetos.push(new QuestaoFechada(questaoFechada.id, questaoFechada.nomeCurto, questaoFechada.enunciado, questaoFechada.dificuldade, questaoFechada.sequencia, questaoFechada.alternativas));
          })
      }

      return objetos;
  }


    validarAlternativas(){
      let quantDeAlternativaCerta=0;
      for(let i=0;i<this.alternativas.length;i++){
        if(this.alternativas[i].isVerdadeira== true){
         quantDeAlternativaCerta ++;
        }
      }
    return quantDeAlternativaCerta;
    }

    validar() {
      if (this.nomeCurto == null || this.nomeCurto == "" ||
        this.enunciado == null || this.enunciado == "" || this.dificuldade == null || this.sequencia == null || this.sequencia < 1 || this.alternativas == undefined ) {
        return false;
      }
      return true;
      
    }
}