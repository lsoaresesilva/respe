import ErroSintaxeCondicional from "../erroSintaxeCondiconal";
import Codigo from '../codigo';

describe("Testes para identificar erros de sintaxe em condições", ()=>{


    it("Deve identificar condições com sintaxe inválida", ()=>{
        let c = new Codigo();
        let algoritmo = "if nome == 'leonardo':\nif idade >:\nif idade > 18:\nif idade <=:\nif idade <= 18:\nif idade = \nif idade > 2 and nome == 'leonardo'\nif salario > 950,30:\n"
        
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[0])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[1])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[2])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[3])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[4])).toBeFalsy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[5])).toBeTruthy()
        expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[7])).toBeFalsy()
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