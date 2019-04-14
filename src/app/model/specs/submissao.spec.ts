import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";

import { TestBed, inject } from "@angular/core/testing";

import { DocumentModule } from "../firestore/document.module";

import { AngularFireModule, FirebaseApp } from "@angular/fire";

import { FirebaseConfiguracao } from "src/environments/firebase";
import Submissao from '../submissao';
import Estudante from '../estudante';
import { Questao } from '../questao';
import Erro from '../erro';
import { TipoErro } from '../tipoErro';

describe("Testes de TUTOR", ()=>{

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

    it("Deve carregar uma submissão com erro", (done)=>{
        let algoritmo = "x = 2\ny = c";
        let estudante = new Estudante("CvsVQsPKIExzNWFh2TWW");
        let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, null);
        let submissao = new Submissao(null, algoritmo, estudante, questao);
        let x = submissao.erros;
        submissao.save().subscribe(resultado=>{
            let erro = new Erro(null, 2, null, TipoErro.variavelNaoDeclarada, resultado);
            erro.save().subscribe(erroCadastrado=>{
                Submissao.get(resultado.id).subscribe(resultadoSubmissao=>{
                    let x = resultadoSubmissao["erro"];
                    expect(resultadoSubmissao["erro"]).toBeDefined();
                    done();
                });
            })
        })
    })

});