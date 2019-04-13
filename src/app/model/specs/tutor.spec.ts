import Codigo from "../codigo";
import { Tutor } from '../tutor';
import { TipoErro } from '../tipoErro';
import Estudante from '../estudante';
import Submissao from '../submissao';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';

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

    it("Deve construir uma relação de erros para um algoritmo com erros de sintaxe.", ()=>{
        let c = new Codigo();
        let algoritmo = "x = 'leonardo'\ny = x\nz = a\nx = 'leonardo'\ny = 2,5\nx == 'leonardo'\nnome do leonardo = 'leo'\nif idade >:\nif idade > 18\ncurrent_time_str = input('What is the current time (in hours 0-23)?'\ndef bla(a_a b c):"
        c.setAlgoritmo(algoritmo);
        let e = new Estudante("12345");
        let s = new Submissao(null, c, e, null)
        let t = new Tutor(s);
        t.analisar();
        expect(t.erros.length).toBe(8)
        expect(t.erros[0].tipo).toBe(TipoErro.variavelNaoDeclarada);
        expect(t.erros[1].tipo).toBe(TipoErro.numeroDecimalComVirgula);
        expect(t.erros[2].tipo).toBe(TipoErro.declaracaoVariavelComDoisIguais);
        expect(t.erros[3].tipo).toBe(TipoErro.espacoNoNomeVariavel);
        expect(t.erros[4].tipo).toBe(TipoErro.parDadosComparacao);
        expect(t.erros[5].tipo).toBe(TipoErro.faltaDoisPontosCondicao);
        expect(t.erros[6].tipo).toBe(TipoErro.faltaParentesis);
        expect(t.erros[7].tipo).toBe(TipoErro.faltaDoisPontosFuncao);
        expect(t.hasErrors()).toBeTruthy();
    })

    it("Deve indicar que não há erros.", ()=>{
        let c = new Codigo();
        let algoritmo = "notaUm = 2\nnotaDois = 3\nmedia = (notaUm+notaDois)/2"
        c.setAlgoritmo(algoritmo);
        let e = new Estudante("12345");
        let s = new Submissao(null, c, e, null)
        let t = new Tutor(s);
        t.analisar();
        expect(t.hasErrors()).toBeFalsy();
    })
})