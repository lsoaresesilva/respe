import { Util } from './util';

export default class Alternativa{
    constructor(public id, public texto, public isVerdadeira){
        if(this.id == null){
            this.id = Util.uuidv4();
        }else{
            this.id = id;
        }
        this.texto = texto;
        this.isVerdadeira = isVerdadeira;
    }

    objectToDocument(){
        let document = {}
        
        document["id"] = this.id;
        document["texto"] = this.texto;
        document["isVerdadeira"] = this.isVerdadeira;

        return document;
    }

    /**
     * Constrói objetos a partir do atributo array de uma document
     * @param alternativas 
     */
    static construir(alternativas:any[]){
        let objetosAlternativas:Alternativa[] = [];

        if(alternativas != null){
            alternativas.forEach(alternativa=>{
                objetosAlternativas.push(new Alternativa(alternativa.id, alternativa.texto, alternativa.isVerdadeira));
            })
        }

        return objetosAlternativas;
    }

    validar() {
        if (this.texto == undefined || this.texto == null || this.isVerdadeira == null || this.isVerdadeira == undefined ) {
          return false;
        }
        return true;
        
      }
    
}