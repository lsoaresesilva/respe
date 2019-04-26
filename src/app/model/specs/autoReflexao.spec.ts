import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { Assunto } from '../assunto';
import Estudante from '../estudante';
import AutoReflexao from '../autoReflexao';


describe("Testes de autoreflexão", ()=>{

    let app: firebase.app.App;
    let afs: AngularFirestore;
    let areflexao:AutoReflexao;

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
        
        let e = new Estudante("12345", null);
        let a = new Assunto("123456", null, null, null)
        areflexao = new AutoReflexao(null, e, a, "fiz certo", "fiz errado");
      });

      it("deve salvar uma autoreflexao", (done)=>{
        
        areflexao.save().subscribe(resposta=>{
            expect(resposta["id"]).toBeDefined();
            AutoReflexao.deleteAll().subscribe(resposta=>{
                done();
            })
        })
    })

    it("Deve gerar um document a partir de um objeto", ()=>{
        let e = new Estudante("12345", null);
        let a = new Assunto("123456", null, null, null)
        areflexao = new AutoReflexao(null, e, a, "fiz certo", "fiz errado");
        expect(areflexao.objectToDocument()).toEqual({estudanteId:"12345", assuntoId:"123456", acoesSucesso:"fiz certo", acoesFracasso:"fiz errado"})
    })

});