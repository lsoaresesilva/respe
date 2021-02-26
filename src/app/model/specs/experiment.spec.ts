import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { Assunto } from '../assunto';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import { AutoInstrucao } from '../autoInstrucao';
import Usuario from '../usuario';
import { PerfilUsuario } from '../enums/perfilUsuario';
import Experiment from '../experimento/experiment';
import { ConhecimentoProgramacao } from '../enums/conhecimentoProgramacao';
import { Groups } from '../experimento/groups';

describe('Testes de Experiment', () => {
  let app: firebase.app.App;
  let afs: AngularFirestore;

  let u1 = null;
  let u2 = null;
  let u3 = null;
  let u4 = null;

  let usuarios = [];

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

  it('Deve calcular a quantidade de alunos por categoria de conhecimento', () => {
    u1 = new Usuario(null, null, null, null, Groups.control, null);
    u1.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u2 = new Usuario(null, null, null, null, Groups.experimentalA, null);
    u2.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u3 = new Usuario(null, null, null, null, Groups.experimentalA, null);
    u3.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u4 = new Usuario(null, null, null, null, Groups.control, null);
    u4.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.pouco;

    usuarios = [u1, u2, u3, u4];

    const categorias = Experiment.construirCategoriasAlunos(usuarios);
    expect(categorias.get(ConhecimentoProgramacao.nenhum).get(Groups.control)).toBe(1);
    expect(categorias.get(ConhecimentoProgramacao.nenhum).get(Groups.experimentalA)).toBe(2);
    expect(categorias.get(ConhecimentoProgramacao.pouco).get(Groups.experimentalA)).toBe(0);
    expect(categorias.get(ConhecimentoProgramacao.pouco).get(Groups.control)).toBe(1);
  });

  it('Deve atribuir os alunos ao grupo corretamente', () => {
    u1 = new Usuario(null, null, null, null, Groups.control, null);
    u1.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u2 = new Usuario(null, null, null, null, Groups.experimentalA, null);
    u2.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u3 = new Usuario(null, null, null, null, Groups.experimentalA, null);
    u3.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.nenhum;

    u4 = new Usuario(null, null, null, null, Groups.control, null);
    u4.conhecimentoPrevioProgramacao = ConhecimentoProgramacao.pouco;

    usuarios = [u1, u2, u3, u4];

    const categorias = Experiment.construirCategoriasAlunos(usuarios);
    let grupo = Experiment.assignToGroup(categorias, ConhecimentoProgramacao.nenhum);
    expect(grupo).toBe(Groups.control);

    grupo = Experiment.assignToGroup(categorias, ConhecimentoProgramacao.pouco);
    expect(grupo).toBe(Groups.experimentalA);
  });
});
