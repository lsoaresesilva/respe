import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { Assunto } from '../assunto';
import Estudante from '../estudante';
import AutoReflexao from '../autoReflexao';
import { Questao } from '../questao';
import { Dificuldade } from '../dificuldade';
import { AutoInstrucao } from '../autoInstrucao';


describe("Testes de Auto instrução", ()=>{

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

    it("deve salvar uma Autoinstrução", (done)=>{
        let e = new Estudante("12345");
        let q = new Questao("123456", "nomeCurto", "enunciado", Dificuldade.facil, 1, "ap", []);
        let autoInstrucao = new AutoInstrucao(null, e, q, "problema", "variaveis", "condicoes", "repeticoes", "funcoes", "vetores");
        autoInstrucao.save().subscribe(resposta=>{
            expect(resposta["id"]).toBeDefined();
            AutoInstrucao.deleteAll().subscribe(resposta=>{
                done();
            })
        })
    })

    it("Deve gerar um document a partir de um objeto", ()=>{
        let e = new Estudante("12345");
        let q = new Questao("123456", "nomeCurto", "enunciado", Dificuldade.facil, 1, "ap", []);
        let autoInstrucao = new AutoInstrucao(null, e, q, "problema", "variaveis", "condicoes", "repeticoes", "funcoes", "vetores");
        expect(autoInstrucao.objectToDocument()).toEqual({estudanteId:"12345", questaoId:"123456", problema:"problema", variaveis:"variaveis", condicoes:"condicoes", repeticoes:"repeticoes", funcoes:"funcoes", vetores:"vetores"})
    })

});