import Codigo from "../codigo";
import { Tutor } from '../tutor';
import { TipoErro } from '../tipoErro';
import Estudante from '../estudante';

describe("Testes de TUTOR", ()=>{

    it("Deve construir uma relação de erros para um algoritmo com erros de sintaxe.", ()=>{
        let c = new Codigo();
        let algoritmo = "x = 'leonardo'\ny = x\nz = a\nx = 'leonardo'\ny = 2,5\nx == 'leonardo'\nnome do leonardo = 'leo'\nif idade >:\nif idade > 18\ncurrent_time_str = input('What is the current time (in hours 0-23)?'\ndef bla(a_a b c):"
        c.setAlgoritmo(algoritmo);
        let t = new Tutor(c, new Estudante("12345"));
        t.analisar();
        expect(t.erros.length).toBe(8)
        expect(t.erros[0].tipo).toBe(TipoErro.variavelNaoDeclarada);
        expect(t.erros[1].tipo).toBe(TipoErro.numeroDecimalComVirgula);
        expect(t.erros[2].tipo).toBe(TipoErro.declaracaoVariavelComDoisIguals);
        expect(t.erros[3].tipo).toBe(TipoErro.espacoNoNomeVariavel);
        expect(t.erros[4].tipo).toBe(TipoErro.parDadosComparacao);
        expect(t.erros[5].tipo).toBe(TipoErro.faltaDoisPontosCondicao);
        expect(t.erros[6].tipo).toBe(TipoErro.faltaParentesis);
        expect(t.erros[7].tipo).toBe(TipoErro.faltaDoisPontosFuncao);
        expect(t.hasErrors()).toBeTruthy();
    })

    it("Deve indicar que não há erros.", ()=>{
        let c = new Codigo();
        let algoritmo = "notaUm = 2\nnotaDois = 3\nmedia = (notaUm+notaDois)/2"
        c.setAlgoritmo(algoritmo);
        let t = new Tutor(c, new Estudante("12345"));
        t.analisar();
        expect(t.hasErrors()).toBeFalsy();
    })
})