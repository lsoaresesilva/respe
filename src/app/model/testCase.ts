import { Document, Collection } from './firestore/document'
import { Util } from './util';

export default class TestCase {
    entradas: String[];
    saida: String;
    id;

    constructor(id, entradas, saida) {
        this.entradas = entradas;
        this.saida = saida;
        if (id == null)
            this.id = Util.uuidv4();
        else {
            this.id = id;
        }
    }

    objectToDocument() {
        let document = {}
        document["saida"] = this.saida;
        document["id"] = this.id

        if (this.entradas != null && this.entradas.length > 0)
            document["entradas"] = this.entradas;

        return document;
    }

    /**
     * Constrói objetos TestsCases a partir do atributo testsCases de uma questão (que é um array)
     * @param testsCases 
     */
    static construir(testsCases: any[]) {
        let objetosTestsCases: TestCase[] = [];

        if (testsCases != null) {
            testsCases.forEach(testCase => {
                objetosTestsCases.push(new TestCase(testCase.id, testCase.entradas, testCase.saida));
            })
        }



        return objetosTestsCases;
    }


    validarEntrada(entrada: String) {

        if (entrada == undefined || entrada == null || entrada == "") {
            return false;
        }
        return true;
    }

    validar() {

        if (this.saida == null || this.saida == undefined || this.entradas == null || this.entradas == undefined || this.entradas.length == 0) {
            return false;
        }
        return true;
    }

    static validarTestsCases(tests: TestCase[]) {
        for (let i = 0; i < tests.length; i++) {
            if (!tests[i].validar()) {
                return false;
            }
        }
        return true;
    }



}