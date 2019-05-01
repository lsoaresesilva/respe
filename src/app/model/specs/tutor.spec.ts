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
import ResultadoTestCase from '../resultadoTestCase';
import { forkJoin } from 'rxjs';
import Erro from '../erro';

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

    it("Deve falhar ao tentar calcular o error quotient sem submissoes", ()=>{
        expect(function () {
            Tutor.calcularErrorQuotient(null);
            
          }).toThrow();
    })

    afterEach((done)=>{
        ResultadoTestCase.deleteAll().subscribe(resultado=>{
          done();
        })
      })

    it("Deve calcular como média 0.75 para os tests cases respondidos", (done) => {
        let r = new ResultadoTestCase(null, false, null, new Estudante("12345", null));
        let r1 = new ResultadoTestCase(null, true, null, new Estudante("12345", null));
        let r2 = new ResultadoTestCase(null, true, null, new Estudante("12345", null));
        let r3 = new ResultadoTestCase(null, true, null, new Estudante("12345", null));

        let salvamentos = [];
        salvamentos.push(r.save())
        salvamentos.push(r1.save())
        salvamentos.push(r2.save())
        salvamentos.push(r3.save())

        forkJoin(salvamentos).subscribe(resultados => {
            Tutor.mediaTestsCases(new Estudante("12345", null)).subscribe(media => {
                expect(media).toBe(0.75);

               
                    done();
                
            })
        })


    })

    it("Deve construir uma relação de erros para um algoritmo com erros de sintaxe.", ()=>{
        let c = new Codigo();
        let algoritmo = "x = 'leonardo'\ny = x\nz = a\nx = 'leonardo'\ny = 2,5\nx == 'leonardo'\nnome do leonardo = 'leo'\nif idade >:\nif idade > 18\ncurrent_time_str = input('What is the current time (in hours 0-23)?'\ndef bla(a_a b c):"
        c.setAlgoritmo(algoritmo);
        let e = new Estudante("12345", null);
        let s = new Submissao(null, c, e, null)
        let t = new Tutor(s);
        t.analisar();
        expect(t.erros.length).toBe(8)
        expect(t.hasErrors()).toBeTruthy();
    })

    it("Deve indicar que não há erros.", ()=>{
        let c = new Codigo();
        let algoritmo = "notaUm = 2\nnotaDois = 3\nmedia = (notaUm+notaDois)/2"
        c.setAlgoritmo(algoritmo);
        let e = new Estudante("12345", null);
        let s = new Submissao(null, c, e, null)
        let t = new Tutor(s);
        t.analisar();
        expect(t.hasErrors()).toBeFalsy();
    })

    it("Deve calcular um error quotient de 1", ()=>{
        let s = new Submissao(null, null, null, null);
        let e = new Erro(null, 1, null, null, null);
        s.erros = [e];
        let s2 = new Submissao(null, null, null, null);
        let e2 = new Erro(null, 1, null, null, null);
        s2.erros = [e2];

        expect(Tutor.errorQuotient(s, s2)).toBe(1);
    })

    it("Deve calcular um error quotient de 0", ()=>{
        let s = new Submissao(null, null, null, null);
        let s2 = new Submissao(null, null, null, null);
        expect(Tutor.errorQuotient(s, s2)).toBe(0);

        s = new Submissao(null, null, null, null);
        let e = new Erro(null, 1, null, null, null);
        s.erros = [e];
        s2 = new Submissao(null, null, null, null);
        expect(Tutor.errorQuotient(s, s2)).toBe(0);
    })

    it("Deve retornar undefined quando não existir um par de submissões", ()=>{
        let s = new Submissao(null, null, null, null);
        expect(Tutor.errorQuotient(s, null)).toBeNull();
    })

    it("Deve calcular um error quotient de 0.5", ()=>{
        let s = new Submissao(null, null, null, null);
        let e = new Erro(null, 1, null, null, null);
        s.erros = [e];
        let s2 = new Submissao(null, null, null, null);
        let e2 = new Erro(null, 1, null, null, null);
        s2.erros = [e2];
        let s3 = new Submissao(null, null, null, null);
        let s4 = new Submissao(null, null, null, null);
        let submissoes = [s, s2, s3, s4]
        expect(Tutor.calcularErrorQuotient(submissoes)).toBe(0.5);
    })
})