import { Questao } from "../questao";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Dificuldade } from '../dificuldade';
import { Assunto } from '../assunto';

describe("Testes de questão", ()=>{

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

    it("deve validar false para uma questão inválida", ()=>{
        let q = new Questao(null, null, null, null, null, null, null);
        expect(q.validar()).toBeFalsy();
        q = new Questao(null, null, null, null, null, null, []);
        expect(q.validar()).toBeFalsy();
    })

    it("deve validar true para uma questão válida", ()=>{
        let q = new Questao(null, "algo", "enunciado", Dificuldade.facil, 1, new Assunto(null), [new Assunto(null)]);
        expect(q.validar()).toBeTruthy();
    })

    it("deve salvar uma questão corretamente", (done)=>{
        let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, new Assunto("12345"), [new Assunto("12345"), new Assunto("54321")]);
        q.save().subscribe(resultado=>{
            expect(resultado).toBeDefined();
            done();
        })
        
    })
})