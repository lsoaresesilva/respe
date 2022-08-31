/* import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FirebaseConfiguracao } from "src/environments/firebase";
import { DocumentModule } from "../../firestore/document.module";
import { Util } from '../../util';
import Diario from '../diario';
import DiarioProgramacao from '../diarioProgramacao';

describe('Testes de diários', () => {
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

    it("Total de respostas no diário", (done)=>{
        let totalAlunos = [];
        let json = [];
        DiarioProgramacao.getAll().subscribe(diarios=>{
            diarios.forEach(diario=>{
                if(!totalAlunos.includes(diario.estudanteId)){
                    totalAlunos.push(diario.estudanteId);
                }

                json.push({tipo:diario.tipo, estudante:diario.estudanteId, texto:diario.texto, data:Util.firestoreDateToDate(diario.data).toString()})
            })

            console.log(JSON.stringify(json));

            let x = 0;
            done();
        })


    })

});
 */
