import { inject, TestBed } from "@angular/core/testing";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { FirebaseConfiguracao } from "src/environments/firebase";
import { DocumentModule } from "../../firestore/document.module";

import submissoesEstudantes from '../../../../../json/submissoes_09abr.json';
import pageTracksEstudantes from '../../../../../json/pageTracks.json';
import Submissao from "../../submissao";
import ProcessMining from "../processMining";
import Usuario from "../../usuario";
import { QuestaoProgramacao } from "../../questoes/questaoProgramacao";
import PageTrackRecord from "../pageTrack";
import { Util } from "../../util";
import ResultadoTestCase from "../../resultadoTestCase";

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

    it("Deve gerar os estados para um aluno", ()=>{

        function getAlunos(mslq, estudanteId){
          if(mslq == "low"){
            if(estudanteId == "bBqzCttYCys2ykOAReoX" ||
              estudanteId == "ZE3AZqq9KN6uTjQAw8LS" ||
              estudanteId == "WBN7iBrLgbtQQufUcHUl" ||
              estudanteId == "YUeSqIQKAv4ZBNzhRv37"){
                return true;
              }
          }else{
            if(estudanteId == "T7m08acxezz82QGk29rC" ||
            estudanteId == "9KcXtMtAIMyji0CUi4xM" ||
            estudanteId == "uwL18mtNF2M8Iy4DLFio" ||
            estudanteId == "fwvNcONxtaPLT1WnWVWa" ||
            estudanteId == "uqqsPnUvjguXc5nPAGtV"){
              return true;
            }
          }

          return false;
        }

        let eventos = [];

        let sEstudantes = new Map<string, any[]>();
        submissoesEstudantes['submissoes'].forEach((s) => {
              if(getAlunos("high", s["estudante"])){
                let submissoes = sEstudantes.get(s["estudante"]);
                if(submissoes == null){
                  sEstudantes.set(s["estudante"], []);
                }

                let submissao = new Submissao(null, s.codigo, new Usuario(s["estudante"], null, null, null, null, null), null, new QuestaoProgramacao(s.questaoId, null, null, null, null, null, null, null, null));
                submissao.erro = s.erro;
                let resultadosTestsCases = [];
                s.resultadosTesteCase.forEach(res=>{
                  let resT = new ResultadoTestCase(res.id, res.status, res.respostaAlgoritmo, null);
                  resultadosTestsCases.push(resT);
                })
                submissao["questaoId"] = s.questaoId;
                submissao.resultadosTestsCases = resultadosTestsCases;
                submissao.data = new Date(s.data);
                sEstudantes.get(s["estudante"]).push(submissao);

                //submissoesEstudante.push(s);
              }
            
        });

        let pTrackJson = [];
        let pTracksEstudantes = new Map<string, any[]>();
        pageTracksEstudantes['pageTrack'].forEach((p) => {

            if(getAlunos("high", p["estudante"])){
                let tracks = pTracksEstudantes.get(p["estudante"]);
                if(tracks == null){
                  pTracksEstudantes.set(p["estudante"], []);
                }

                let pageTrack = new PageTrackRecord(p["id"], p["pagina"], new Usuario(p["estudante"], null, null, null, null, null));
                pageTrack.data = Util.firestoreDateToDate(p["data"]);

                pTracksEstudantes.get(p["estudante"]).push(pageTrack)
                /* p["data"] = Util.firestoreDateToDate(p["data"]) as any;
                pTrackJson.push(p); */
            } 
        });

        pTrackJson.sort((p1, p2)=>{
          if(p1.data < p2.data){
            return -1;
          }else if(p1.data > p2.data){
            return 1;
          }else{
            return 0;
          }
        })
        /* console.log(JSON.stringify(pTrackJson)); */

        sEstudantes.forEach((subs, estudanteId)=>{
          let submissoesAgrupadas = Submissao.agruparPorQuestao(subs);
          
          submissoesAgrupadas.forEach((subQuest, questaoId)=>{
            let submissoesQuestaoEstudante = [];
            subQuest.forEach(s=>{
              /* let submissao = new Submissao(null, s.codigo, new Usuario(s["estudante"], null, null, null, null, null), null, new QuestaoProgramacao(s.questaoId, null, null, null, null, null, null, null, null));
              submissao.erro = s.erro; */
              
              submissoesQuestaoEstudante.push(s);
            })

            submissoesQuestaoEstudante.sort((submissaoA, submissaoB)=>{
              if(submissaoA.data < submissaoB.data){
                  return -1;
              }else if(submissaoA.data > submissaoB.data){
                  return 1;
              }else{
                  return 0;
              }
            })
            eventos = eventos.concat(ProcessMining.identificarEventos(submissoesQuestaoEstudante, pTracksEstudantes.get(estudanteId)));
          })
          
        });

        
        //let submissoesQuestao = submissoesAgrupadas.get("c4e98001-f1fb-4de3-979e-55718edb92d2");
        console.log(JSON.stringify(eventos));
    })
});