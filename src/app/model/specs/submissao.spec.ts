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
import { forkJoin } from 'rxjs';
import Usuario from '../usuario';
import Codigo from '../codigo';
import TestCase from '../testCase';
import ResultadoTestCase from '../resultadoTestCase';

describe("Testes de Submissão", ()=>{

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
        let estudante = new Usuario("CvsVQsPKIExzNWFh2TWW", null, null, null, 0);
        let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, [], null);
        let c = new Codigo();
        c.algoritmo = "x = 2\ny = c";
        let submissao = new Submissao(null, c, estudante, questao);
        let x = submissao.erros;
        submissao.save().subscribe(resultado=>{
            let erro = new Erro(null, 2, null, TipoErro.variavelNaoDeclarada, resultado);
            erro.save().subscribe(erroCadastrado=>{
                Submissao.get(resultado.id).subscribe(resultadoSubmissao=>{
                    let x = resultadoSubmissao["erros"];
                    expect(resultadoSubmissao["erros"].length).toEqual(1);
                    forkJoin([Submissao.delete(submissao.pk()), Erro.delete(erro.pk())]).subscribe(r=>{
                        done();
                    })
                    
                });
            })
        })
    })

    
    it("Deve carregar uma submissão mais recente", (done)=>{
        let c = new Codigo();
        c.algoritmo = "x = 2\ny = c";
        let estudante = new Usuario("CvsVQsPKIExzNWFh2TWW", null, null, null, 0);
        let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, [], null);
        let s1 = new Submissao(null, c, estudante, questao);
        let s2 = new Submissao(null, c, estudante, questao);
        let x = s1.erros;
    
        s1.save().subscribe(resultado=>{
            s2.save().subscribe(res=>{
                Submissao.getRecentePorQuestao(questao, estudante).subscribe(submissao=>{
                    expect(submissao["pk"]()).toEqual(s2.pk());
                    forkJoin([Submissao.delete(s1.pk()), Submissao.delete(s2.pk())]).subscribe(r=>{
                        done();
                    })
                    done();
                })
            })
        })
    })

    it("Deve carregar as submissões de uma questão", (done)=>{

        let c = new Codigo();
        c.algoritmo = "x = 2\ny = c";

        let e1 = new Usuario("123", null, null, null, 0);
        let e2 = new Usuario("456", null, null, null, 0);
        let e3 = new Usuario("789", null, null, null, 0);

        let t1 = new TestCase(null, [1,2], 3);
        let t2 = new TestCase(null, [2,2], 4);

        let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, [t1, t2], null);
        let s1 = new Submissao(null, c, e1, questao);
        let rt1s1 = new ResultadoTestCase(null, true, null, t1);
        let rt2s1 = new ResultadoTestCase(null, true, null, t2);
        s1.resultadosTestsCases = [rt1s1, rt2s1];

        let s2 = new Submissao(null, c, e2, questao); 
        let rt1s2 = new ResultadoTestCase(null, true, null, t1);
        let rt2s2 = new ResultadoTestCase(null, true, null, t2);
        s2.resultadosTestsCases = [rt1s2, rt2s2];

        let s3 = new Submissao(null, c, e3, questao); 
        let rt1s3 = new ResultadoTestCase(null, true, null, t1);
        let rt2s3 = new ResultadoTestCase(null, false, null, t2);
        s3.resultadosTestsCases = [rt1s3, rt2s3];
        
        forkJoin([s1.save(), s2.save(), s3.save()]).subscribe(resultado=>{
            Submissao.getSubmissoesRecentesTodosUsuarios(questao, e1).subscribe(submissoes=>{
                expect(submissoes.length).toBe(1);
                expect(submissoes[0].pk()).toBe(s2.pk());
                forkJoin([Submissao.delete(s1.pk()), Submissao.delete(s2.pk()), Submissao.delete(s3.pk())]).subscribe(r=>{
                    done()
                })
                
            })
        })
    })

});