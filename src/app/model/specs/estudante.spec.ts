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

    it("deve apagar um estudante pelo seu id", (done)=>{
        let e = new Estudante(null, "Leonardo");
        e.save().subscribe(resultado=>{
            let pk = resultado.pk();
            Estudante.delete(pk).subscribe(resultadoDelete=>{
                expect(resultadoDelete).toBeTruthy();
                Estudante.get(pk).subscribe(resultado=>{
                    fail();
                }, err=>{
                    expect(err).toBeDefined();
                    done();
                })
            })
        })
        
    })
})