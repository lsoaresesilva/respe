import { TestBed, inject } from '@angular/core/testing';

import { LivroService } from './livro.service';
import Secao from '../model/livro/secao';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { DocumentModule } from '../model/firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';

describe('LivroService', () => {
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

  it('should be created', () => {
    const service: LivroService = TestBed.get(LivroService);
    expect(service).toBeTruthy();
  });

  it("deve retornar uma seção anterior e próxima", (done)=>{
    let s1 = new Secao(null, null, 3);
    let s2 = new Secao(null, null, 2);
    let s3 = new Secao(null, null, 1);

    const service: LivroService = TestBed.get(LivroService);

    service.state["secoes"] = [s1, s2, s3];
    /*service.getSecaoAnterior(s1).subscribe(secao=>{
      expect(secao["sequencia"]).toBe(2);
      service.getSecaoProxima(s2).subscribe(secao=>{
        expect(secao["sequencia"]).toBe(3);
        service.getSecaoAnterior(s3).subscribe(secao=>{
          expect(secao).toBe(null);
          service.getSecaoProxima(s1).subscribe(secao=>{
            expect(secao).toBe(null);
            done()
          })
        })
      })
      
    })*/
    
  })
});
