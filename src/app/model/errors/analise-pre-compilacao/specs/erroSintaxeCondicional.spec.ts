/* import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DocumentModule } from 'src/app/model/firestore/document.module';
import Submissao from 'src/app/model/submissao';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import ErroSintaxeCondicional from '../erroSintaxeCondiconal';

import SyntaxError from '../../analise-compilacao/syntaxError';
import submissoesEstudantes from '../../../../../../json/submissoes_27_jan_v2.json';
import ErroCompilacaoFactory from '../../analise-compilacao/erroCompilacaoFactory';

import ErroSintaxe from '../erroSintaxe';

describe('Testes para identificar erros de sintaxe em condições', () => {
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

  xit('Deve identificar condições com sintaxe inválida', () => {
    let algoritmo =
      "if nome == 'leonardo':\nif idade >:\nif idade > 18:\nif idade <=:\nif idade <= 18:\nif idade = \nif idade > 2 and nome == 'leonardo'\nif salario > 950,30\nif idade = 10";
    let s = new Submissao(null, algoritmo, null, null, null);
    let linhasCodigo = s.linhasAlgoritmo();

    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[0])).toBeFalsy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[1])).toBeTruthy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[2])).toBeFalsy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[3])).toBeTruthy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[4])).toBeFalsy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[5])).toBeTruthy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[7])).toBeFalsy();
    expect(ErroSintaxeCondicional.apenasUmaComparacao(linhasCodigo[8])).toBeFalsy();
  });

  xit('Deve identificar condições (com and e or) que foram comparadas com apenas uma = em ', () => {
    let algoritmo =
      'if x > y and z < a:\nif x > y and z:\nif x > y and a > b and c > d\nif x > y or a > b\nelif x > a:\nif a > b or a <\nif x+y+z > a and x:\nif x+y+z >\nif a+b+z > 3 and x > 2:';
    let s = new Submissao(null, algoritmo, null, null, null);
    let linhasCodigo = s.linhasAlgoritmo();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[0])).toBeFalsy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[1])).toBeTruthy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[2])).toBeFalsy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[3])).toBeFalsy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[4])).toBeFalsy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[5])).toBeTruthy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[6])).toBeTruthy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[7])).toBeTruthy();
    expect(ErroSintaxe.apenasUmaComparacao(linhasCodigo[8])).toBeFalsy();
  });



  xit('Deve identificar condições que foram comparadas com apenas uma =', () => {
    let algoritmo =
      "if nome == leonardo\nif idade = 13\nif idade = 2 and nome == 'leonardo'\nidade == 30";
    let s = new Submissao(null, algoritmo, null, null, null);
    let linhasCodigo = s.linhasAlgoritmo();

    expect(
        ErroSintaxe.comparacaoApenasUmaIgualdade(linhasCodigo[0])
    ).toBeFalsy();
    expect(
        ErroSintaxe.comparacaoApenasUmaIgualdade(linhasCodigo[1])
    ).toBeTruthy();
    expect(
        ErroSintaxe.comparacaoApenasUmaIgualdade(linhasCodigo[2])
    ).toBeTruthy();
    expect(
        ErroSintaxe.comparacaoApenasUmaIgualdade(linhasCodigo[3])
    ).toBeFalsy();
  });

  xit('Deve identificar os principais erros nos algoritmos', () => {
    let erroSyntax = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] != null && s['erro']['traceback'] != null) {
        let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
        if (categoria instanceof SyntaxError) {
          let erros = ErroSintaxeCondicional.erros(new Submissao(null, s["codigo"], null, null, null));
          if(erros.length != 0){
            erroSyntax.push(erros);
          }
        }
      }
    });

    let x = erroSyntax;

  });

  xit('Deve encontrar os falsos positivos', () => {
    // Deve rodar o algoritmo apenas naqueles códigos que não possuem erro.
    // O que identificar de erro, é um falso positivo
    let falsosPositivos = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] == null) {
        let erros = ErroSintaxeCondicional.erros(
          new Submissao(null, s['codigo'], null, null, null)
        );
        if (erros.length > 0) {
          falsosPositivos.push(s);
        }
      }
    });

    expect(falsosPositivos.length).toBe(84);
  });

  xit('Deve resolver casos falso positivo ', () => {
    let algoritmo =
      'else:';
    let s = new Submissao(null, algoritmo, null, null, null);
    let erro = ErroSintaxeCondicional.erros(s);
    expect(erro.length).toBeGreaterThan(0);
  });

  xit('Deve encontrar os falsos negativos', () => {
    let falsoNegativo = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] != null) {
        if (
          s['erro']['traceback'].search('if') != -1 ||
          s['erro']['traceback'].search('elif') != -1 ||
          s['erro']['traceback'].search('else') != -1
        ) {
          let erros = ErroSintaxeCondicional.erros(
            new Submissao(null, s['codigo'], null, null, null)
          );
          let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
          if (categoria instanceof SyntaxError) {
            if (erros.length == 0) {

                falsoNegativo.push(s);
            }
          }
        }
      }
    });

    expect(falsoNegativo.length).toBe(118);
  });

  it('Deve exportar os dados', () => {



    let errosSyntax = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (s['erro'] != null && s['erro']['traceback'] != null) {
        let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
        if (categoria instanceof SyntaxError) {
          let erros = ErroSintaxeCondicional.erros(new Submissao(null, s["codigo"], null, null, null));
          if(erros.length != 0){
            errosSyntax.push(erros);
          }
        }
      }
    });

    let resultado = ErroSintaxeCondicional.exportar(errosSyntax);
    console.log(JSON.stringify(resultado));

    expect(errosSyntax.length).toBe(118);
  });
});

 */
