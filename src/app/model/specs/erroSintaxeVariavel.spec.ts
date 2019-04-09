import ErroSintaxeVariavel from "../erroSintaxeVariavel";
import Codigo from '../codigo';

describe("Testes de análise de sintaxe para variáveis", ()=>{
    it("Deve identificar uma variável que não foi declarada", ()=>{
        let c = new Codigo();
        let algoritmo = "x = 'leonardo'\ny = x\nz = a"
        c.setAlgoritmo(algoritmo);
        let variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(c);
        expect(variaveisNaoDeclaradas.length).toBe(1);
        expect(variaveisNaoDeclaradas[0].nome).toBe("a");
        expect(variaveisNaoDeclaradas[0].linha).toBe(3);

        algoritmo = "x = 'leonardo'\ny = x\nz=a\na=2\ny = 2,5\n" // PROBLEMA está nesse 2,5. ele está identificando 2 como sendo uma variável que foi utilizada
        c.setAlgoritmo(algoritmo);
        variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(c);
        expect(variaveisNaoDeclaradas.length).toBe(1);
        expect(variaveisNaoDeclaradas[0].nome).toBe("a");
        expect(variaveisNaoDeclaradas[0].linha).toBe(3);

        algoritmo = "notaUm = 2\nnotaDois = 3\nmedia = (notaUm+notaDois)/2" // PROBLEMA está nesse 2,5. ele está identificando 2 como sendo uma variável que foi utilizada
        c.setAlgoritmo(algoritmo);
        variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(c);
        expect(variaveisNaoDeclaradas.length).toBe(0);
        
    })

    it("Deve identificar variáveis reais que foram declaradas com ,", ()=>{
        let c = new Codigo();
        let algoritmo = "x = 'leonardo'\ny = 2,5"
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeVariavel.numeroDecimalComVirgula(linhasCodigo[0])).toBeFalsy()
        expect(ErroSintaxeVariavel.numeroDecimalComVirgula(linhasCodigo[1])).toBeTruthy()
    })

    it("Deve identificar variáveis que tem valor atribuído com dois ==", ()=>{
        let c = new Codigo();
        let algoritmo = "x == 'leonardo'\ny = 2,5\nif nome == 'leonardo':\nelif idade == 13"
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhasCodigo[0])).toBeTruthy()
        expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhasCodigo[1])).toBeFalsy()
        expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhasCodigo[2])).toBeFalsy()
        expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhasCodigo[3])).toBeFalsy()
    })

    it("Deve identificar variáveis que tenham espaço em seu nome", ()=>{
        let c = new Codigo();
        let algoritmo = "nome = 'leonardo'\nnome do leonardo = 'leo'\nnome pessoa = 'leonardo'\ idade = 31"
        c.setAlgoritmo(algoritmo);
        let linhasCodigo = c.linhasAlgoritmo();
        
        expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[0])).toBeFalsy()
        expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[1])).toBeTruthy()
        expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[2])).toBeTruthy()
        expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[3])).toBeFalsy()
        
    })
})