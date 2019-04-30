import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";

import { TestBed, inject } from "@angular/core/testing";

import { DocumentModule } from "../firestore/document.module";

import { AngularFireModule, FirebaseApp } from "@angular/fire";

import { FirebaseConfiguracao } from "src/environments/firebase";

import { Assunto } from "../assunto";

import { Questao } from "../questao";

import { Dificuldade } from "../dificuldade";

import TestCase from "../testCase";
import ResultadoTestCase from '../resultadoTestCase';
import { forkJoin } from 'rxjs';
import Estudante from '../estudante';

describe("Testes de questão", () => {

    let app: firebase.app.App;
    let afs: AngularFirestore;


    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
        TestBed.configureTestingModule({
            imports: [
                DocumentModule,
                AngularFireModule.initializeApp(FirebaseConfiguracao),
                AngularFirestoreModule//.enablePersistence()
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {

            app = _app;
            afs = _afs;
        })();

    });

    it("deve resultar em true para uma questão que teve todos os tests cases respondidos", (done) => {
        let a = new Assunto(null, "umAssunto", null, null, null);
        a.save().subscribe(resultado => {
            let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

            let t = new TestCase(null, ["a", "b"], "c", q)
            let t1 = new TestCase(null, ["d", "e"], "a", q)
            let testsCases = [t, t1]

            q.testsCases = testsCases;
            q.save().subscribe(resultado => {
                let rt = new ResultadoTestCase(null, true, t, new Estudante("123", "oi")).save();
                let rt2 = new ResultadoTestCase(null, true, t1, new Estudante("123", "oi")).save();

                forkJoin([rt, rt2]).subscribe(resultadoSalvarTestCases => {
                    Assunto.isFinalizado(a).subscribe(resultado => {
                        expect(resultado).toBeTruthy();
                        Assunto.delete(a.pk())
                        Questao.delete(q.pk()).subscribe(r => {
                            TestCase.deleteAll().subscribe(r => {
                                ResultadoTestCase.deleteAll().subscribe(r => {
                                    done();
                                })
                            })
                        })
                    })

                })
            })
        })


    })

    it("deve resultar em false para uma questão que teve todos os tests cases respondidos", (done) => {
        let a = new Assunto(null, "umAssunto", null, null, null);
        a.save().subscribe(resultado => {
            let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

            let t = new TestCase(null, ["a", "b"], "c", q)
            let t1 = new TestCase(null, ["d", "e"], "a", q)
            let testsCases = [t, t1]

            q.testsCases = testsCases;
            q.save().subscribe(resultado => {
                let rt = new ResultadoTestCase(null, true, t, new Estudante("123", "oi")).save();
                let rt2 = new ResultadoTestCase(null, false, t, new Estudante("123", "oi")).save();
                let rt3 = new ResultadoTestCase(null, true, t1, new Estudante("123", "oi")).save();

                forkJoin([rt, rt2, rt3]).subscribe(resultadoSalvarTestCases => {
                    Assunto.isFinalizado(a).subscribe(resultado => {
                        expect(resultado).toBeFalsy();
                        Assunto.delete(a.pk())
                        Questao.delete(q.pk()).subscribe(r => {
                            TestCase.deleteAll().subscribe(r => {
                                ResultadoTestCase.deleteAll().subscribe(r => {
                                    done();
                                })
                            })
                        })
                    })
                })



            })


        })
    })

});

