import Estudante from "../estudante";
import ResultadoTestCase from '../resultadoTestCase';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { forkJoin } from 'rxjs';

describe("Testes de estudante", () => {

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

    it("Deve calcular como média 0.75 para os tests cases respondidos", (done) => {
        let r = new ResultadoTestCase(null, false, null, new Estudante("12345"));
        let r1 = new ResultadoTestCase(null, true, null, new Estudante("12345"));
        let r2 = new ResultadoTestCase(null, true, null, new Estudante("12345"));
        let r3 = new ResultadoTestCase(null, true, null, new Estudante("12345"));

        let salvamentos = [];
        salvamentos.push(r.save())
        salvamentos.push(r1.save())
        salvamentos.push(r2.save())
        salvamentos.push(r3.save())

        forkJoin(salvamentos).subscribe(resultados => {
            Estudante.mediaTestsCases(new Estudante("12345")).subscribe(media => {
                expect(media).toBe(0.75);

                ResultadoTestCase.deleteAll().subscribe(resultado => {
                    done();
                })
            })
        })


    })
})