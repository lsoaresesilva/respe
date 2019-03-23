import { Estatistica } from "./estatistica";
import Submissao from './submissao';
import { NameError } from '../../model/nameErro';

describe("Testes da estatística por tipo de erro", ()=>{

    it("Deve retornar um array vazio se não forem passados dados", ()=>{
        let dados = [];
        let estatistica = new Estatistica(dados);
        
        expect(estatistica.calcularPorTipoErro().length).toEqual(0);
    })
    
    it("Não deve realizar a soma para um elemento do array que seja inválido", ()=>{
        let dados = [{erro:undefined}];
        let estatistica = new Estatistica(dados);
        
        expect(estatistica.calcularPorTipoErro()[0].nameError).toEqual(0);
    });

    it("Deve retornar a frequência de tipos de erros", ()=>{
        let dados = [];
        let erro01 = new NameError("NameError: name 'x' is not defined");
        let envioCodigo01 = new Submissao("1", "bla");
        envioCodigo01.erro = erro01;
        let envioCodigo02 = new Submissao("1", "bla");
        envioCodigo02.erro = erro01;

        
        dados.push(envioCodigo01);
        dados.push(envioCodigo02);
        
        let estatistica = new Estatistica(dados);
        
        

        expect(estatistica.calcularPorTipoErro().length).toEqual(1);
    })

});