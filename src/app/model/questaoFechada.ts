import { Document, Collection } from './firestore/document';
import { Dificuldade } from './dificuldade';
import { Assunto } from './assunto';
import Alternativa from './alternativa';

@Collection("questoesFechadas")
export default class QuestaoFechada extends Document{
  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntoPrincipal: Assunto;
  sequencia: number;
  alternativas: Alternativa[];

  constructor(id, nomeCurto, enunciado, dificuldade, sequencia, assuntoPrincipal, alternativas) {
    super(id);
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.assuntoPrincipal = assuntoPrincipal;
    this.alternativas = alternativas;
  }

    objectToDocument(){
        let document = super.objectToDocument();
        document["assuntoPrincipalId"] = this.assuntoPrincipal.pk();

        return document;
    }


    

    validar() {
      if (this.assuntoPrincipal == null || this.assuntoPrincipal == undefined ||
        this.nomeCurto == null || this.nomeCurto == "" ||
        this.enunciado == null || this.enunciado == "" || this.dificuldade == null || 
        this.sequencia == null || this.sequencia < 1 || this.alternativas == undefined ||
         this.alternativas.length <2 || Alternativa.validarAlternativas(this.alternativas)==false) {
        console.log(this.alternativas.length);
        return false;
      }
      return true;
    }
}

