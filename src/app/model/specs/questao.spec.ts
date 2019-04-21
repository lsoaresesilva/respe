import { Questao } from "../questao";
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Dificuldade } from '../dificuldade';
import { Assunto } from '../assunto';
import AssuntoQuestao from '../assuntoQuestao';
import Query from '../firestore/query';

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
        let q = new Questao(null, "algo", "enunciado", Dificuldade.facil, 1, new Assunto(null, null, null, null), [new Assunto(null, null, null, null)]);
        expect(q.validar()).toBeTruthy();
    })


    /*it("deve salvar uma questão corretamente", (done)=>{
        let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, new Assunto("12345"), [new Assunto("12345"), new Assunto("54321")]);
        q.save().subscribe(resultado=>{
            expect(resultado).toBeDefined();
            Questao.deleteAll().subscribe(resultado=>{
              done();
            })
            
        })
        
    })*/

    it("deve carregar assuntosQuestao pelo id de questao", (done)=>{
      AssuntoQuestao.getAll(new Query("idQuestao", "==", "LwC2ItAVtfkDhcE9jvpT")).subscribe(assuntosQuestao=>{
        expect(assuntosQuestao.length).toBe(2);
        done();
      })
    })

    it("deve carregar Assunto pelo id de questao", (done)=>{
      Assunto.getAll().subscribe(resultado=>{
        expect(resultado.length).toBe(2);
        Assunto.get("dFfoRKSwBjEN1aJWVkgr").subscribe(assunto=>{
          expect(assunto["nome"]).toBe("Condições")
          done();
        },err=>{
          fail();
          done();
        })
      })
      
    })

    it("deve carregar uma questão com seus assuntos", (done)=>{
      Questao.getAll().subscribe(questoes=>{
        expect(questoes.length).toBeGreaterThan(0);
        expect(questoes[0].id).toBe("LwC2ItAVtfkDhcE9jvpT");
        expect(questoes[0].assuntoPrincipal.id).toBe("pVH6LewMxIKM73ep2n1N");
        expect(questoes[0].assuntos.length).toBe(2);
        done();
      }, err=>{
        fail();
        done();
      })
    });
})