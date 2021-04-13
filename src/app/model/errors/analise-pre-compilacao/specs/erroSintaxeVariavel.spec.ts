import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { DocumentModule } from 'src/app/model/firestore/document.module';
import Submissao from 'src/app/model/submissao';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import ErroSintaxeVariavel from '../erroSintaxeVariavel';

import submissoesEstudantes from '../../../../../../json/submissoes_09abr.json';
import ErroCompilacaoFactory from '../../analise-compilacao/erroCompilacaoFactory';
import NameError from '../../analise-compilacao/nameError';

describe('Testes de análise de sintaxe para variáveis', () => {
  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, //.enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  xit('Deve identificar uma variável que não foi declarada', () => {
    let algoritmo = "x = 'leonardo'\ny = x\nz = a";
    let s = new Submissao(null, algoritmo, null, null, null);
    let variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(s);
    expect(variaveisNaoDeclaradas.length).toBe(1);
    expect(variaveisNaoDeclaradas[0].nome).toBe('a');
    expect(variaveisNaoDeclaradas[0].linha).toBe(3);

    algoritmo = "x = 'leonardo'\ny = x\nz=a\na=2\ny = 2.5\n"; // PROBLEMA está nesse 2,5. ele está identificando 2 como sendo uma variável que foi utilizada
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(s);
    expect(variaveisNaoDeclaradas.length).toBe(1);
    expect(variaveisNaoDeclaradas[0].nome).toBe('a');
    expect(variaveisNaoDeclaradas[0].linha).toBe(3);

    algoritmo = 'notaUm = 2\nnotaDois = 3\nmedia = (notaUm+notaDois)/2';
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(s);
    expect(variaveisNaoDeclaradas.length).toBe(0);

    algoritmo = 'nota3 = 2\n x = nota3';
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(s);
    expect(variaveisNaoDeclaradas.length).toBe(0);

    algoritmo = "# Iremos te ajudar, a leitura de números do teclado necessita que eles sejam convertidos de String para int.\n# Para isso nós utilizaremos a instrução int():\nnumeroUmString = input()\nnumeroUm = int( numeroUmString )\nnumeroDoisString = input()\nnumeroDois = int(numeroDoisString)\nsoma = numeroUm + numeroDois\nPrint(soma) \n# Agora é com você, continue o procedimento que falta para concluir o algoritmo."
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(s);
    expect(variaveisNaoDeclaradas.length).toBe(1);
  });

  xit('Deve identificar variáveis reais que foram declaradas com ,', () => {
    let algoritmo = "x = 'leonardo'\ny = 2,5";
    let s = new Submissao(null, algoritmo, null, null, null);
    let linhas = s.codigo.split('\n');

    expect(ErroSintaxeVariavel.numeroDecimalComVirgula(linhas[0])).toBeFalsy();
    expect(ErroSintaxeVariavel.numeroDecimalComVirgula(linhas[1])).toBeTruthy();
  });

  xit('Deve identificar variáveis que tem valor atribuído com dois ==', () => {
    let algoritmo = "x == 'leonardo'\ny = 2,5\nif nome == 'leonardo':\nelif idade == 13";
    let s = new Submissao(null, algoritmo, null, null, null);

    let linhas = s.codigo.split('\n');

    expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhas[0])).toBeTruthy();
    expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhas[1])).toBeFalsy();
    expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhas[2])).toBeFalsy();
    expect(ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhas[3])).toBeFalsy();
  });

  /* it('Deve identificar variáveis que tenham espaço em seu nome', () => {
    let algoritmo =
      "nome = 'leonardo'\nnome do leonardo = 'leo'\nnome pessoa = 'leonardo' idade = 31";
    let s = new Submissao(null, algoritmo, null, null, null);
    let linhasCodigo = s.codigo.split('\n');

    expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[0])).toBeFalsy();
    expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[1])).toBeTruthy();
    expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[2])).toBeTruthy();
    expect(ErroSintaxeVariavel.nomeVariavelComEspaco(linhasCodigo[3])).toBeFalsy();
  }); */

  
  xit('Deve identificar as variáveis utilizadas em uma condição', () => {
    let linha = 'if x == 2:';
    let linha2 = 'if x > a:';
    let linha3 = 'if a+b > c:';
    let linha4 = 'if a+b+z > 3:';
    expect(ErroSintaxeVariavel.getVariaveisCondicao(linha)).toEqual(['x']);
    expect(ErroSintaxeVariavel.getVariaveisCondicao(linha2)).toEqual(['x', 'a']);
    expect(ErroSintaxeVariavel.getVariaveisCondicao(linha3)).toEqual(['a', 'b', 'c']);
    expect(ErroSintaxeVariavel.getVariaveisCondicao(linha4)).toEqual(['a', 'b', 'z']);
  });

  
  xit('Deve identificar as variáveis em uma operação matemática', () => {
    let linha = 'x = x + 2';
    let linha2 = 'z = z*3';
    let linha3 = 'z = a / d';
    let linha4 = 'z = (a / d)+c';
    let linha5 = 'z = a / d+3';
    expect(ErroSintaxeVariavel.getVariaveisOperacaoMatematica(linha)).toEqual(['x']);
    expect(ErroSintaxeVariavel.getVariaveisOperacaoMatematica(linha2)).toEqual(['z']);
    expect(ErroSintaxeVariavel.getVariaveisOperacaoMatematica(linha3)).toEqual(['a', 'd']);
    expect(ErroSintaxeVariavel.getVariaveisOperacaoMatematica(linha4)).toEqual(['a', 'd', 'c']);
    expect(ErroSintaxeVariavel.getVariaveisOperacaoMatematica(linha5)).toEqual(['a', 'd']);
  });


  xit('Deve identificar as variáveis com atribuição simples', () => {
    let linha = 'x = z';
    expect(ErroSintaxeVariavel.getVariaveisAtribuicaoSimples(linha)).toEqual(['z']);
  });

  it('Deve identificar variáveis utilizadas em um algoritmo', () => {
    
    let algoritmo = "nome = 'leonardo'\nprint(c)\nsomar(2,a)";
    let s = new Submissao(null, algoritmo, null, null, null);
    let variaveisUtilizadas = ErroSintaxeVariavel.identificarVariaveisUtilizadas(s);
    expect(variaveisUtilizadas).toEqual([{nome:'c', linha:2},  {nome:'a', linha:3}, {nome:'somar', linha:3}]);
    algoritmo = 'if codigoUm == ABC and codigoDois == DEF:'
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisUtilizadas = ErroSintaxeVariavel.identificarVariaveisUtilizadas(s);
    expect(variaveisUtilizadas).toEqual([{nome:'codigoUm', linha:1},  {nome:'ABC', linha:1}, {nome:'codigoDois', linha:1}, {nome:'DEF', linha:1}]);
    algoritmo = 'if operacao == "soma":'
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisUtilizadas = ErroSintaxeVariavel.identificarVariaveisUtilizadas(s);
    expect(variaveisUtilizadas).toEqual([{nome:'operacao', linha:1}]);
    algoritmo = 'numeroN = int(input())\nif NumeroN % 2 == 0:'
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisUtilizadas = ErroSintaxeVariavel.identificarVariaveisUtilizadas(s);
    expect(variaveisUtilizadas).toEqual([{nome:'NumeroN', linha:2}]);

    algoritmo = 'if soma in range(4):'
    s = new Submissao(null, algoritmo, null, null, null);
    variaveisUtilizadas = ErroSintaxeVariavel.identificarVariaveisUtilizadas(s);
    expect(variaveisUtilizadas).toEqual([{nome:'soma', linha:1}]);
    
  }); 

  xit("Deve identificar strings que faltam aspas", ()=>{
    let algoritmo = "nome = 'leonardo"
    let s = new Submissao(null, algoritmo, null, null, null);
    let stringValida = ErroSintaxeVariavel.faltaAspas(s.linhasAlgoritmo()[0]);
    expect(stringValida).toBeFalsy();
  })

  xit('Deve encontrar os falsos negativos', () => {
    let falsoNegativo = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] != null) {
        if (
          s['erro']['traceback'].search('if') != -1 ||
          s['erro']['traceback'].search('elif') != -1 ||
          s['erro']['traceback'].search('else') != -1
        ) {
          
          let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
          if (categoria instanceof NameError) {
            let erros = ErroSintaxeVariavel.erros(
              new Submissao(null, s['codigo'], null, null, null)
            );
            if (erros.length == 0) {
                console.log(s["codigo"])
                console.log(s['erro']['traceback'])
                falsoNegativo.push(s);
            }
          }
        }
      }
    });

    expect(falsoNegativo.length).toBe(0);
  });

  it('Deve exportar os dados', () => {



    let errosSyntax = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] != null && s['erro']['traceback'] != null) {
        let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
        if (categoria instanceof NameError) {
          let erros = ErroSintaxeVariavel.erros(new Submissao(null, s["codigo"], null, null, null));
          if(erros.length != 0){
            errosSyntax.push(erros);
          }
        }
      }
    });

    let resultado = ErroSintaxeVariavel.exportar(errosSyntax);
    console.log(JSON.stringify(resultado));

    expect(errosSyntax.length).toBe(118);
  });
});
