import Submissao from "src/app/model/submissao"
import NameError from '../nameError';
import SyntaxError from '../syntaxError';
import { ErroCompilacao } from '../erroCompilacao';
import { CategoriaErro } from '../../enum/categoriasErro';

import * as firebase from 'firebase';

import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";

import { TestBed, inject } from "@angular/core/testing";


import { AngularFireModule, FirebaseApp } from "@angular/fire";

import { FirebaseConfiguracao } from "src/environments/firebase";
import { DocumentModule } from 'src/app/model/firestore/document.module';

describe("Testes para a class ErroCompilacao", ()=>{

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

    it("Deve obter todos os erros cometidos pelo estudante", ()=>{
        let submissoes = []
        for(let i = 0; i < 10; i++){
            let s = new Submissao(null, "", "", "");
            let e;
            if(i%2 == 0)
                e = new SyntaxError(null, "");
            else
                e = new NameError(null, "");

            s.erro = e;
            submissoes.push(s);
        }

        let erros = ErroCompilacao.getAllErros(submissoes);
        expect(erros.length).toBe(10);
    })

    it("Deve contabilizar o total de erros, agrupados por tipo e mês", ()=>{
        let erros = []


        let contadorMesJaneiroNameError = 0;
        let contadorMesFevereiroNameError = 0;
        let contadorMesJaneiroSyntaxError = 0;
        let contadorMesFevereiroSyntaxError = 0;
        let mesJaneiro = 1578396378; // epoch time
        let mesFevereiro = 1581074778;
        for(let i = 0; i < 10; i++){
            //let s = new Submissao(null, null, null, null);
            let erro;
            let random = Math.floor(Math.random() * 10); 
            if(i%2 == 0){
                
                erro = new NameError(null, "");
                if(random%2 == 0){
                    contadorMesJaneiroNameError += 1;
                    erro.data = new firebase.firestore.Timestamp(mesJaneiro, 0);
                }else{
                    contadorMesFevereiroNameError += 1;
                    erro.data = new firebase.firestore.Timestamp(mesFevereiro, 0);
                }
                
                
            }else{
                erro = new SyntaxError(null, "");
                if(random%2 == 0){
                    contadorMesJaneiroSyntaxError += 1;
                    erro.data = new firebase.firestore.Timestamp(mesJaneiro, 0);
                }else{
                    contadorMesFevereiroSyntaxError += 1;
                    erro.data = new firebase.firestore.Timestamp(mesFevereiro, 0);
                }
                //erro.data = new Date(2019, mes, 31);
            }

            erros.push(erro);
        }

        let histogramas = ErroCompilacao.calcularFrequenciaPorMes(erros);
            expect(histogramas[0][CategoriaErro.nameError].contagem).toBe(contadorMesJaneiroNameError);
            expect(histogramas[1][CategoriaErro.nameError].contagem).toBe(contadorMesFevereiroNameError);
            expect(histogramas[0][CategoriaErro.syntaxError].contagem).toBe(contadorMesJaneiroSyntaxError);
            expect(histogramas[1][CategoriaErro.syntaxError].contagem).toBe(contadorMesFevereiroSyntaxError);


    })
})