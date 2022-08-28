/* import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { DocumentModule } from '../../firestore/document.module';
import Export from '../export';

describe('Testes para process mining', () => {

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

  xit('Deve carregar os pagetracks', () => {
    Export.getPageTracks().subscribe((pageTracks) => {
      //console.log(pageTracks);
    });
  });

  it("Deve carregar usuários que não devem ter os dados coletados para análise de pagetrack", (done)=>{
    Export.getUsuariosExcluidos().subscribe(usuarios=>{
      console.log(usuarios);
      done();
    })
  })

});
 */
