import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import TestCase from '../testCase';
import Query from '../firestore/query';
import Turma from '../turma';
import { forkJoin } from 'rxjs';
import Usuario from '../usuario';
import { PerfilUsuario } from '../enums/perfilUsuario';

describe('Testes de turma', () => {
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

  it('deve carregar um estudante com seus alunos', (done) => {
    let e = new Usuario(null, '', '', PerfilUsuario.estudante, 0);
    let e2 = new Usuario(null, '', '', PerfilUsuario.estudante, 0);
    let t = new Turma(null, 'turma', [e, e2], null);

    forkJoin([e.save(), e2.save()]).subscribe((resultado) => {
      t.save().subscribe((r) => {
        Turma.get(t.pk()).subscribe((turma) => {
          expect(turma['estudantes'].length).toBe(2);
          forkJoin([
            Usuario.delete(e.pk()),
            Usuario.delete(e2.pk()),
            Turma.delete(t.pk()),
          ]).subscribe((res) => {
            done();
          });
        });
      });
    });
  });
});
