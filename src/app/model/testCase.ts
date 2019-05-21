import { Document, Collection } from './firestore/document'

@Collection("testsCases")
export default class TestCase {
    entradas: String[];
    saida: String;
    id;

    constructor(id, entradas, saida) {
        this.entradas = entradas;
        this.saida = saida;
        if(id == null)
            this.id = this.uuidv4();
        else{
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
     * Constrói objetos TestsCases a partir de atributo testsCases de uma questão
     * @param testsCases 
     */
    static construir(testsCases:any[]){
        let objetosTestsCases:TestCase[] = [];

        testsCases.forEach(testCase=>{
            objetosTestsCases.push(new TestCase(testCase.id, testCase.entradas, testCase.saida));
        })

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


    /**
     * Gerador de UUID. 
     * Autor: https://stackoverflow.com/posts/2117523/revisions
     */
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}