import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import TestCase from '../testCase';
import Query from '../firestore/query';

describe("Testes de testcase", ()=>{

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
/*
      it("deve carregar todos os testscases para uma questão", (done)=>{
        TestCase.getAll(new Query("idQuestao", "==", "LwC2ItAVtfkDhcE9jvpT")).subscribe(testsCases=>{
            expect(testsCases.length).toBe(2);
            done();
        })
    })
*/
});