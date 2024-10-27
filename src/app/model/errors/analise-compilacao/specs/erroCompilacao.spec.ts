/* import Submissao from 'src/app/model/submissao';
import NameError from '../nameError';
import SyntaxError from '../syntaxError';
import { ErroCompilacao } from '../erroCompilacao';
import { CategoriaErro } from '../../enum/categoriasErro';

import * as firebase from 'firebase/compat';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { TestBed, inject } from '@angular/core/testing';

import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';

import { FirebaseConfiguracao } from 'src/environments/firebase';
import { DocumentModule } from 'src/app/model/firestore/document.module';
import { getLabelPorCategoriaNumero } from '../../enum/labelCategoriasErro';

describe('Testes para a class ErroCompilacao', () => {
  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, // .enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  xit('Deve obter todos os erros cometidos pelo estudante', () => {
    const submissoes = [];
    for (let i = 0; i < 10; i++) {
      const s = new Submissao(null, '', null, null, null);
      let e;
      if (i % 2 == 0) {
        e = new SyntaxError(null, '');
      } else {
        e = new NameError(null, '');
      }

      s.erro = e;
      submissoes.push(s);
    }

    const erros = ErroCompilacao.getAllErros(submissoes);
    expect(erros.length).toBe(10);
  });

  xit('Deve contabilizar o total de erros, agrupados por tipo e mês', () => {
    const erros = [];

    let contadorMesJaneiroNameError = 0;
    let contadorMesFevereiroNameError = 0;
    let contadorMesJaneiroSyntaxError = 0;
    let contadorMesFevereiroSyntaxError = 0;
    const mesJaneiro = 1578396378; // epoch time
    const mesFevereiro = 1581074778;
    for (let i = 0; i < 10; i++) {
      // let s = new Submissao(null, null, null, null);
      let erro;
      const random = Math.floor(Math.random() * 10);
      if (i % 2 == 0) {
        erro = new NameError(null, '');
        if (random % 2 == 0) {
          contadorMesJaneiroNameError += 1;
          erro.data = new firebase.firestore.Timestamp(mesJaneiro, 0);
        } else {
          contadorMesFevereiroNameError += 1;
          erro.data = new firebase.firestore.Timestamp(mesFevereiro, 0);
        }
      } else {
        erro = new SyntaxError(null, '');
        if (random % 2 == 0) {
          contadorMesJaneiroSyntaxError += 1;
          erro.data = new firebase.firestore.Timestamp(mesJaneiro, 0);
        } else {
          contadorMesFevereiroSyntaxError += 1;
          erro.data = new firebase.firestore.Timestamp(mesFevereiro, 0);
        }
        // erro.data = new Date(2019, mes, 31);
      }

      erros.push(erro);
    }


  });

  it('Deve calcular a frequência dos erros', () => {
    const e = new NameError(null, '');
    e.categoria = CategoriaErro.nameError;
    const e2 = new NameError(null, '');
    e2.categoria = CategoriaErro.nameError;
    const e3 = new SyntaxError(null, '');
    e3.categoria = CategoriaErro.syntaxError;
    // Mudar para classe FrequenciaErro
    const freq = ErroCompilacao.calcularFrequencia([e, e2, e3]);
    expect(freq[getLabelPorCategoriaNumero(e.categoria)]).toBe(2);
    expect(freq[getLabelPorCategoriaNumero(e3.categoria)]).toBe(1);
  });
});
 */
