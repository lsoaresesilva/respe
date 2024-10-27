/* import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { FirebaseConfiguracao } from 'src/environments/firebase';

describe('Testes de autoreflexão', () => {
  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, //.enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  it("deve salvar uma autoreflexao", (done)=>{
    let e = new Estudante("12345", null);
    let a = new Assunto("123456", null)
    let planejamento = new Planejamento(null, e, a, 120, "muito", Dificuldade.medio, "estrategia", null, null)
    planejamento.save().subscribe(resposta => {

    expect(resposta["id"]).toBeDefined();
      Planejamento.deleteAll().subscribe(resposta => {
        done();
      })
    })
  })

it("Deve gerar um document a partir de um objeto", () => {
  let e = new Estudante("12345", null);
  let a = new Assunto("123456", null)
  let planejamento = new Planejamento(null, e, a, 120, "muito", Dificuldade.medio, "estrategia", null, null)
  expect(planejamento.objectToDocument()).toEqual({ estudanteId: "12345", assuntoId: "123456", tempoEstudo: 120, importanciaAssunto: "muito", dificuldadeConteudo:Dificuldade.medio, estrategiaRealizacaoEstudo:"estrategia" })
})
});
 */
