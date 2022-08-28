import Sequencia from "../sequencia"
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';

describe("Testes de sequência", ()=>{

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

    it("Deve retornar um array de sequências ordenado a partir do atributo sequência", ()=>{
        let sequencias = [new Sequencia(null, null, null, null, 2), new Sequencia(null, null, null, null, 1), new Sequencia(null, null, null, null, 3)]
        let arrayOdernado = Sequencia.ordenar(sequencias);
        expect(arrayOdernado[0].sequencia).toBe(1)
        expect(arrayOdernado[1].sequencia).toBe(2)
        expect(arrayOdernado[2].sequencia).toBe(3)
    })
})
