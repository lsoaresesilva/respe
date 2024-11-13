import { Util } from '../../util';

export default class Alternativa {
    constructor(public primary_key, public texto, public isVerdadeira) {
        if (primary_key == null) {
            this.primary_key = Util.uuidv4();
        } else {
            this.primary_key = primary_key;
        }
        this.texto = texto;
        this.isVerdadeira = isVerdadeira;
    }

    get pk(){
        return this.primary_key
    }

    objectToDocument() {
        let document = {}

        document["id"] = this.primary_key;
        document["texto"] = this.texto;
        document["isVerdadeira"] = this.isVerdadeira;

        return document;
    }

    /**
     * Constrói objetos a partir do atributo array de uma document
     * @param alternativas
     */
    static construir(alternativas: any[]) {
        let objetosAlternativas: Alternativa[] = [];

        if (alternativas != null) {
            alternativas.forEach(alternativa => {
                objetosAlternativas.push(new Alternativa(alternativa.primary_key, alternativa.texto, alternativa.is_verdadeira));
            })
        }

        return objetosAlternativas;
    }


    validar() {
        if (this.texto == undefined || this.texto == null || this.isVerdadeira == null || this.isVerdadeira == undefined) {
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


    static calcularQuantasAlternativasCertas(alternativas: Alternativa[]) {
        let quantDeAlternativaCerta = 0;
        for (let i = 0; i < alternativas.length; i++) {
            if (alternativas[i].isVerdadeira == true) {
                quantDeAlternativaCerta++;
            }
        }
        return quantDeAlternativaCerta;
    }

}
