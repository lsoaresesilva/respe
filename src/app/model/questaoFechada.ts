import { Dificuldade } from './dificuldade';
import Alternativa from './alternativa';
import { Util } from './util';
import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import Query from './firestore/query';
import Usuario from './usuario';

export default class QuestaoFechada{

  constructor(public id, public nomeCurto, public enunciado, public dificuldade:Dificuldade, public sequencia, public alternativas: Alternativa[],public respostaQuestao:String,public respostaUsuario) {
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
    this.respostaQuestao = respostaQuestao;
    this.respostaUsuario = respostaUsuario;
  }

  
    objectToDocument(){
        let document = {}
        document["id"] = this.id;
        document["nomeCurto"] = this.nomeCurto;
        document["enunciado"] = this.enunciado;
        document["dificuldade"] = this.dificuldade;
        document["sequencia"] = this.sequencia;
        document["respostaQuestao"] = this.respostaQuestao;


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
          objetos.push(new QuestaoFechada(questaoFechada.id, questaoFechada.nomeCurto, questaoFechada.enunciado, questaoFechada.dificuldade, questaoFechada.sequencia, Alternativa.construir(questaoFechada.alternativas),questaoFechada.respostaQuestao,questaoFechada.respostaUsuario));
          })
      }

      return objetos;
  }

  validar() {
    if (this.nomeCurto == null || this.nomeCurto == "" ||
      this.enunciado == null || this.enunciado == "" || this.dificuldade == null ||
       this.sequencia == null || this.sequencia < 1 || this.alternativas == undefined ||
        this.alternativas.length == 0 || Alternativa.validarAlternativas(this.alternativas)==false) {
      return false;
    }
    return true;
  
  }


 
}