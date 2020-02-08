
/*
describe("Testes das funcionalidades de código", ()=>{
    it("Deve retornar um array com os nomes das funções de um código", ()=>{
        let algoritmo = "def bla():\n\tx = 2\ndef ble():\n\ty = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let funcoes = codigo.identificarFuncoes();
        expect(funcoes).toEqual(["bla", "ble"]);
    })

    it("Deve retornar um array vazio se não houverem funções no código", ()=>{
        let algoritmo = "x = 2\ny = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let funcoes = codigo.identificarFuncoes();
        expect(funcoes).toEqual([]);
    })

    it("Deve retornar um array com os nomes das variáveis de um código", ()=>{
        let algoritmo = "def bla():\n\tx = 2\ndef ble():\n\ty = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let variaveis = codigo.identificarVariaveis();
        expect(variaveis).toEqual(["x", "y"]);
    })

    it("Deve retornar um array vazio se não houverem funções no código", ()=>{
        let algoritmo = "print('oi')";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let variaveis = codigo.identificarVariaveis();
        expect(variaveis).toEqual([]);
    })

    it("Deve retornar a linha de um determinado trecho de código", ()=>{
        let algoritmo = "casaa = 2\nnome = 'leonardo'\nprint(caza)\ndef calcular()\n\tx = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let linha = codigo.localizarLinha("x = 3");
        expect(linha).toEqual(5);
    })

    it("Deve retornar -1 para um trecho de código que não existe", ()=>{
        let algoritmo = "casaa = 2\nnome = 'leonardo'\nprint(caza)\ndef calcular()\n\tx = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let linha = codigo.localizarLinha("x = 4");
        expect(linha).toEqual(-1);
    })

    it("Deve retornar null para uma linha informada que não existe", ()=>{
        let algoritmo = "casaa = 2\nnome = 'leonardo'\nprint(caza)\ndef calcular()\n\tx = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let trecho = codigo.getCodigoLinha(10)
        expect(trecho).toBeNull();

        trecho = codigo.getCodigoLinha(-1)
        expect(trecho).toBeNull();
    })

    it("Deve retornar um trecho de código para uma linha informada", ()=>{
        let algoritmo = "casaa = 2\nnome = 'leonardo'\nprint(caza)\ndef calcular()\n\tx = 3";
        let codigo = new Codigo();
        codigo.algoritmo = algoritmo;
        let trecho = codigo.getCodigoLinha(2)
        expect(trecho).toEqual("nome = 'leonardo'");
    })
})*/