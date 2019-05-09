import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import TestCase from '../testCase';
import Query from '../firestore/query';
import Turma from '../turma';
import Estudante from '../estudante';
import { forkJoin } from 'rxjs';

describe("Testes de turma", ()=>{

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

      it("deve carregar um estudante com seus alunos", (done)=>{
        let e = new Estudante(null, "oi", null);
        let e2 = new Estudante(null, "olá", null);
        let t = new Turma(null, "turma", [e, e2]);

        forkJoin([e.save(), e2.save()]).subscribe(resultado=>{
          t.save().subscribe(r=>{
            Turma.get(t.pk()).subscribe(turma=>{
              expect(turma["estudantes"].length).toBe(2);
              forkJoin([Estudante.delete(e.pk()), Estudante.delete(e2.pk()), Turma.delete(t.pk())]).subscribe(res=>{
                done();
              })
            });
          })
        })

        
    })

});