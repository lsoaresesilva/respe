import Submissao from '../submissao';
import Usuario from '../usuario';
import { PerfilUsuario } from '../enums/perfilUsuario';
import Erro from '../errors/erro';
import { TipoErro } from '../errors/analise-pre-compilacao/enum/tipoErro';
import { forkJoin } from 'rxjs';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import { Dificuldade } from '../enums/dificuldade';

describe('Testes para a classe de Erro', () => {
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

  /*it("Deve retornar os erros das submissões de um estudante", (done)=>{
        let u = new Usuario(null, "", "", PerfilUsuario.estudante, 0);
        let q = new Questao(12345, "", "", Dificuldade.dificil, 1, [], [], "");
        let s1 = new Submissao(null, new Codigo(), u, q);
        let s2 = new Submissao(null, new Codigo(), u, q);
        let e1 = new Erro(null, 2, "bla", TipoErro.comparacaoApenasUmaIgualdade, s1);
        let e2 = new Erro(null, 2, "bla", TipoErro.comparacaoApenasUmaIgualdadeTexto, s1);
        let e3 = new Erro(null, 2, "bla", TipoErro.comparacaoApenasUmaIgualdadeTexto, s2);
        u.save().subscribe(res=>{
            forkJoin([s1.save(), s2.save()]).subscribe(res=>{
                forkJoin([e1.save(), e2.save(), e3.save()]).subscribe(res=>{
                    Erro.getAllErrosEstudante(u).subscribe(res=>{
                        expect(res["length"]).toBe(3);
                        done();
                    });
                })
            })
        })
    })*/
});
