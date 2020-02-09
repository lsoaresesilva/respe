/*import Codigo from "../codigo";
import { NameError } from '../nameErro';
import SolucaoNameError from '../solucaoNameError';

describe("Testes do algoritmo que identifica uma possível solução para o problema NameError do algoritmo", ()=>{
    it("Deve retornar a solução para um problema de NameError", ()=>{
        let codigoComErro = new Codigo();
        codigoComErro.algoritmo = "casa = 2\nprint(caza)";
        let erro = new NameError("NameError: name 'caza' is not defined on line 2");
        let solucao = new SolucaoNameError(erro, codigoComErro);
        expect(solucao.linha).toEqual(1);
        expect(solucao.trecho).toEqual("casa = 2");
    })
    
    it("Deve retornar o trecho de código que pode conter a solução", ()=>{
       let codigoComErro = new Codigo();
       codigoComErro.algoritmo = "casa = 2\nprint(caza)";
       let erro = new NameError("NameError: name 'caza' is not defined on line 2");
       let solucao = new SolucaoNameError(erro, codigoComErro);
       expect(solucao.linha).toEqual(1);
       
    })
    
    it("Deve identificar a variável que o estudante deveria ter escrito", ()=>{
        let codigoComErro = new Codigo();
        codigoComErro.algoritmo = "casa = 2\nnome = 'leonardo'\nprint(caza)"
        let erro = new NameError("NameError: name 'caza' is not defined on line 2");
        let solucao = new SolucaoNameError(erro, codigoComErro);
        let solucaoVariavel = solucao.verificarSimilaridade(codigoComErro.identificarVariaveis());  
        expect(solucaoVariavel).toEqual({nome:"casa", similaridade:0.75});
    })

    
    it("Deve retornar vazio quando não são passados dados corretos", ()=>{
        let codigoComErro = new Codigo();
        codigoComErro.algoritmo = "casa = 2\nnome = 'leonardo'\nprint(caza)";
        let erro = new NameError("NameError: name 'caza' is not defined on line 2");
        let solucao = new SolucaoNameError(erro, codigoComErro);
        let solucaoVariavel = solucao.verificarSimilaridade([]);  
        expect(solucaoVariavel).toEqual({});
    })

    it("Deve retornar que uma variável representa a solução para o problema", ()=>{
        let codigoComErro = new Codigo();
        codigoComErro.algoritmo = "casa = 2\nnome = 'leonardo'\nprint(caza)\ndef calcular()\n\tx =3";
        let erro = new NameError("NameError: name 'caza' is not defined on line 2");
        let solucao = new SolucaoNameError(erro, codigoComErro);
        let solucaoVariavel = solucao.solucaoNameError();  
        expect(solucaoVariavel).toEqual("casa = ");
    })

    

})*/