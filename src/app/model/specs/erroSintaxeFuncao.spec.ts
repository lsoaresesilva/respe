import Codigo from "../codigo";
import ErroSintaxeFuncao from '../errors/analise-pre-compilacao/erroSintaxeFuncao';

describe("Testes para identificar erros de sintaxe em condições", ()=>{

    it("Se houver falta de parênteses deve retornar true", () => {
        let codigoComErro = new Codigo();
        
        //expect(solucao.faltaParentese()).toEqual([{linha:1, trecho:"current_time_str = input('What is the current time (in hours 0-23)?'"}, {linha:3, trecho:"current_time_int = int(current_time_str"}]);
        expect(ErroSintaxeFuncao.faltaParentese("current_time_str = input('What is the current time (in hours 0-23)?'")).toBeTruthy();
    })

    it("Se a quantidade de parênteses estiver correta deve retornar false", () => {
   
        //expect(solucao.faltaParentese()).toEqual([{linha:1, trecho:"current_time_str = input('What is the current time (in hours 0-23)?'"}, {linha:3, trecho:"current_time_int = int(current_time_str"}]);
        expect(ErroSintaxeFuncao.faltaParentese("current_time_str = input('What is the current time (in hours 0-23)?')")).toBeFalsy();
    })

    it("Se tiver faltando virgula deve retornar true", ()=>{
        
        expect(ErroSintaxeFuncao.faltaVirgula("def bla(a_a b c):")).toBeTruthy();

        expect(ErroSintaxeFuncao.faltaVirgula("def bla(a_a b, c):")).toBeTruthy();
        
    })

    it("Se tiver o quantitativo de virgulas corretos deve retornar false", ()=>{
        
        expect(ErroSintaxeFuncao.faltaVirgula("def bla(a_a, b, c):")).toBeFalsy();
        expect(ErroSintaxeFuncao.faltaVirgula("def bla(a_a,b,c):")).toBeFalsy();
        
    });

    it("Deve retornar uma lista de parâmetros para uma função", ()=>{
        let linha = "somar(a, 2,c,d)"
        expect(ErroSintaxeFuncao.getParametros(linha)).toEqual(["a", "c", "d"]);
    })

})