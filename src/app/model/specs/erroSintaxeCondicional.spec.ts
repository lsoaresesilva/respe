import ErroSintaxeCondicional from "../errors/analise-pre-compilacao/erroSintaxeCondiconal";
import Codigo from '../codigo';

describe("Testes para identificar erros de sintaxe em condições", ()=>{


    it("Deve identificar condições com sintaxe inválida", ()=>{
        let c = new Codigo();
        let algoritmo = "if nome == 'leonardo':\nif idade >:\nif idade > 18:\nif idade <=:\nif idade <= 18:\nif idade = \nif idade > 2 and nome == 'leonardo'\nif salario > 950,30\nif idade = 10"
        
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[0])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[1])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[2])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[3])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[4])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[5])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[7])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[8])).toBeFalsy()
    })

    it("Deve identificar condições (com and e or) que foram comparadas com apenas uma = em ", ()=>{
        let c = new Codigo();
        let algoritmo = "if x > y and z < a:\nif x > y and z:\nif x > y and a > b and c > d\nif x > y or a > b\nelif x > a:\nif a > b or a <\nif x+y+z > a and x:\nif x+y+z >\nif a+b+z > 3 and x > 2:"
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[0])).toBeFalsy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[1])).toBeTruthy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[2])).toBeFalsy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[3])).toBeFalsy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[4])).toBeFalsy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[5])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[6])).toBeTruthy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[7])).toBeTruthy();
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[8])).toBeFalsy();
    })


    it("Deve identificar condições que foram comparadas com apenas uma =", ()=>{
        let c = new Codigo();
        let algoritmo = "if nome == leonardo\nif idade = 13\nif idade = 2 and nome == 'leonardo'\nidade == 30"
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhasCodigo[0])).toBeFalsy();
        expect(ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhasCodigo[1])).toBeTruthy();
        expect(ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhasCodigo[2])).toBeTruthy();
        expect(ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhasCodigo[3])).toBeFalsy();
        
    })
});