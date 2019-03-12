import Codigo from "../codigo";
import { ParseError } from '../parseError';

describe("Testes do algoritmo que identifica uma possível solução para o problema ParseError do algoritmo", () => {

    it("Deve retornar a solução para um problema de ParseError", () => {
        /*let codigoComErro = new Codigo();
        codigoComErro.algoritmo = "current_time_str = input('What is the current time (in hours 0-23)?')\nwait_time_str = input('How many hours do you want to wait')\ncurrent_time_int = int(current_time_str\nwait_time_int = int(wait_time_str)\nfinal_time_int = current_time_int + wait_time_int\nprint(final_time_int)";
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(codigoComErro, erro);
        expect(solucao.linha).toEqual(1);
        expect(solucao.trecho).toEqual("casa = 2");*/
    })

    it("Se houver falta de parênteses deve retornar true", () => {
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        //expect(solucao.faltaParentese()).toEqual([{linha:1, trecho:"current_time_str = input('What is the current time (in hours 0-23)?'"}, {linha:3, trecho:"current_time_int = int(current_time_str"}]);
        expect(ParseError.faltaParentese("current_time_str = input('What is the current time (in hours 0-23)?'")).toBeTruthy();
    })

    it("Se a quantidade de parênteses estiver correta deve retornar false", () => {
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        //expect(solucao.faltaParentese()).toEqual([{linha:1, trecho:"current_time_str = input('What is the current time (in hours 0-23)?'"}, {linha:3, trecho:"current_time_int = int(current_time_str"}]);
        expect(ParseError.faltaParentese("current_time_str = input('What is the current time (in hours 0-23)?')")).toBeFalsy();
    })

    it("Se houver falta de dois pontos deve retornar true", () => {
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        
        expect(ParseError.faltaDoisPontos("for x in 2")).toBeTruthy();
    })

    it("Se tiver dois pontos deve retornar true", () => {
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        
        expect(ParseError.faltaDoisPontos("for x in 2:")).toBeFalsy();
    })

    it("Se tiver faltando virgula deve retornar true", ()=>{
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        expect(ParseError.faltaVirgula("def bla(a_a b c):")).toBeTruthy();

        expect(ParseError.faltaVirgula("def bla(a_a b, c):")).toBeTruthy();
        
    })

    it("Se tiver o quantitativo de virgulas corretos deve retornar false", ()=>{
        let codigoComErro = new Codigo();
        
        let erro = new ParseError("ParseError: bad input on line 4");
        let solucao = new ParseError(erro);
        expect(ParseError.faltaVirgula("def bla(a_a, b, c):")).toBeFalsy();
        expect(ParseError.faltaVirgula("def bla(a_a,b,c):")).toBeFalsy();
        
    });
});