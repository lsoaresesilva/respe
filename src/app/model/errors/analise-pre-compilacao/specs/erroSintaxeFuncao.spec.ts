/* import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DocumentModule } from 'src/app/model/firestore/document.module';
import Submissao from 'src/app/model/submissao';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import ErroSintaxeVariavel from '../erroSintaxeVariavel';

import submissoesEstudantes from '../../../../../../json/submissoes_27_jan_v2.json';
import ErroCompilacaoFactory from '../../analise-compilacao/erroCompilacaoFactory';
import NameError from '../../analise-compilacao/nameError';
import ErroSintaxeFuncao from '../erroSintaxeFuncao';

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

  it('Deve identificar a falta de parêntesis em uma função', () => {
    let algoritmo = "texto = input(";
    let s = new Submissao(null, algoritmo, null, null, null);
    let faltaParentesis = ErroSintaxeFuncao.faltaParentese(algoritmo);
    expect(faltaParentesis).toBeTruthy();


  });

  it('Deve identificar a falta de dois pontos', () => {
    let algoritmo = "def somar(a,b)";
    let faltaDoisPontos = ErroSintaxeFuncao.faltaDoisPontos(algoritmo);
    expect(faltaDoisPontos).toBeTruthy();


  });

  it('Deve identificar a falta de vírgula nos parâmetros', () => {
    let algoritmo = "def somar(a b):";
    let faltaVirgula = ErroSintaxeFuncao.faltaVirgula(algoritmo);
    expect(faltaVirgula).toBeTruthy();


  });


});
 */
