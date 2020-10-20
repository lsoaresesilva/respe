import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { TestBed, inject } from '@angular/core/testing';

import { DocumentModule } from '../firestore/document.module';

import { AngularFireModule, FirebaseApp } from '@angular/fire';

import { FirebaseConfiguracao } from 'src/environments/firebase';
import Submissao from '../submissao';
import { Questao } from '../questao';
import { forkJoin } from 'rxjs';
import Usuario from '../usuario';
import TestCase from '../testCase';
import ResultadoTestCase from '../resultadoTestCase';
import { firestore } from 'firebase/app';

describe('Testes de Submissão', () => {
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

  it('Deve filtrar todas as submissões da última semana', () => {
    const estudante = new Usuario('CvsVQsPKIExzNWFh2TWW', null, null, null, 0);
    const questao = new Questao('LwC2ItAVtfkDhcE9jvpT', null, null, null, null, null, [], null);
    const submissao = new Submissao(null, 'x = 2\ny = c', estudante, questao);
    submissao.data = firestore.Timestamp.now();

    const submissaoDois = new Submissao(null, 'x = 2\ny = c', estudante, questao);

    const oitoDiasAtras = new Date();
    oitoDiasAtras.setDate(new Date().getDate() - 8);
    submissaoDois.data = firestore.Timestamp.fromDate(oitoDiasAtras);

    const questaoDois = new Questao('abcde', null, null, null, null, null, [], null);
    const submissaoTres = new Submissao(null, 'x = 2\ny = c', estudante, questao);

    const doisDiasAtras = new Date();
    doisDiasAtras.setDate(new Date().getDate() - 2);
    submissaoTres.data = firestore.Timestamp.fromDate(doisDiasAtras);

    const semanaAtras = new Date();
    semanaAtras.setDate(new Date().getDate() - 7);

    const submissoesFiltradas = Submissao.filtrarSubmissoesPorData(
      [submissao, submissaoDois, submissaoTres],
      new Date(),
      semanaAtras
    );
    expect(submissoesFiltradas.length).toBe(2);
  });

  it('Deve obter as questões de um conjunto de submissões', () => {
    const estudante = new Usuario('CvsVQsPKIExzNWFh2TWW', null, null, null, 0);
    const questao = new Questao('LwC2ItAVtfkDhcE9jvpT', null, null, null, null, null, [], null);
    const submissao = new Submissao(null, 'x = 2\ny = c', estudante, questao);
    submissao['questaoId'] = questao.id;
    submissao.data = firestore.Timestamp.now();

    const submissaoDois = new Submissao(null, 'x = 2\ny = c', estudante, questao);
    submissaoDois['questaoId'] = questao.id;

    const oitoDiasAtras = new Date();
    oitoDiasAtras.setDate(new Date().getDate() - 8);
    submissaoDois.data = firestore.Timestamp.fromDate(oitoDiasAtras);

    const questaoDois = new Questao('abcde', null, null, null, null, null, [], null);
    const submissaoTres = new Submissao(null, 'x = 2\ny = c', estudante, questaoDois);
    submissaoDois['questaoId'] = questaoDois.id;

    const doisDiasAtras = new Date();
    doisDiasAtras.setDate(new Date().getDate() - 2);
    submissaoTres.data = firestore.Timestamp.fromDate(doisDiasAtras);

    const semanaAtras = new Date();
    semanaAtras.setDate(new Date().getDate() - 7);

    const submissoesFiltradas = Submissao.filtrarSubmissoesPorData(
      [submissao, submissaoDois, submissaoTres],
      new Date(),
      semanaAtras
    );

    const questoes = Submissao.getQuestoesDeSubmissoes(submissoesFiltradas);

    expect(questoes.length).toBe(2);
  });

  xit('Deve carregar uma submissão com erro', (done) => {
    const estudante = new Usuario('CvsVQsPKIExzNWFh2TWW', null, null, null, 0);
    const questao = new Questao('LwC2ItAVtfkDhcE9jvpT', null, null, null, null, null, [], null);
    const submissao = new Submissao(null, 'x = 2\ny = c', estudante, questao);

    submissao.save().subscribe((resultado) => {
      // TODO: Incluir erro
      /*let erro = new Erro(null, 2, null, TipoErro.variavelNaoDeclarada, resultado);
            erro.save().subscribe(erroCadastrado=>{
                Submissao.get(resultado.id).subscribe(resultadoSubmissao=>{
                    let x = resultadoSubmissao["erros"];
                    expect(resultadoSubmissao["erros"].length).toEqual(1);
                    forkJoin([Submissao.delete(submissao.pk()), Erro.delete(erro.pk())]).subscribe(r=>{
                        done();
                    })

                });
            })*/
    });
  });

  xit('Deve carregar uma submissão mais recente', (done) => {
    const estudante = new Usuario('CvsVQsPKIExzNWFh2TWW', null, null, null, 0);
    const questao = new Questao('LwC2ItAVtfkDhcE9jvpT', null, null, null, null, null, [], null);
    const s1 = new Submissao(null, 'x = 2\ny = c', estudante, questao);
    const s2 = new Submissao(null, 'x = 2\ny = c', estudante, questao);

    s1.save().subscribe((resultado) => {
      s2.save().subscribe((res) => {
        Submissao.getRecentePorQuestao(questao, estudante).subscribe((submissao) => {
          expect(submissao['pk']()).toEqual(s2.pk());
          forkJoin([Submissao.delete(s1.pk()), Submissao.delete(s2.pk())]).subscribe((r) => {
            done();
          });
          done();
        });
      });
    });
  });

  xit('Deve carregar as submissões de uma questão', (done) => {
    const e1 = new Usuario('123', null, null, null, 0);
    const e2 = new Usuario('456', null, null, null, 0);
    const e3 = new Usuario('789', null, null, null, 0);

    const t1 = new TestCase(null, [1, 2], 3);
    const t2 = new TestCase(null, [2, 2], 4);

    const questao = new Questao(
      'LwC2ItAVtfkDhcE9jvpT',
      null,
      null,
      null,
      null,
      null,
      [t1, t2],
      null
    );
    const s1 = new Submissao(null, 'x = 2\ny = c', e1, questao);
    const rt1s1 = new ResultadoTestCase(null, true, null, t1);
    const rt2s1 = new ResultadoTestCase(null, true, null, t2);
    s1.resultadosTestsCases = [rt1s1, rt2s1];

    const s2 = new Submissao(null, 'x = 2\ny = c', e2, questao);
    const rt1s2 = new ResultadoTestCase(null, true, null, t1);
    const rt2s2 = new ResultadoTestCase(null, true, null, t2);
    s2.resultadosTestsCases = [rt1s2, rt2s2];

    const s3 = new Submissao(null, 'x = 2\ny = c', e3, questao);
    const rt1s3 = new ResultadoTestCase(null, true, null, t1);
    const rt2s3 = new ResultadoTestCase(null, false, null, t2);
    s3.resultadosTestsCases = [rt1s3, rt2s3];

    forkJoin([s1.save(), s2.save(), s3.save()]).subscribe((resultado) => {
      Submissao.getSubmissoesRecentesTodosUsuarios(questao, e1).subscribe((submissoes) => {
        expect(submissoes.length).toBe(1);
        expect(submissoes[0].pk()).toBe(s2.pk());
        forkJoin([
          Submissao.delete(s1.pk()),
          Submissao.delete(s2.pk()),
          Submissao.delete(s3.pk()),
        ]).subscribe((r) => {
          done();
        });
      });
    });
  });
});
