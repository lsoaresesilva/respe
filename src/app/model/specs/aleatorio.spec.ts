/* import { TestBed, inject } from "@angular/core/testing";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { forkJoin, Observable } from "rxjs";
import { FirebaseConfiguracao } from 'src/environments/firebase';
import AtividadeGrupo from "../cscl/atividadeGrupo";
import { DocumentModule } from "../firestore/document.module";
import Query from "../firestore/query";
import { Assunto } from "../questoes/assunto";
import Submissao from "../submissao";
import Usuario from "../usuario";
import { Util } from "../util";

function isFinalizada(questao, estudanteId, dataEncerramento){
    return new Observable(observer=>{
        Submissao.getAll([new Query("questaoId", "==", questao.questao.id), new Query("estudanteId", "==", estudanteId)]).subscribe(submissoes=>{
            submissoes = submissoes.map(submissao=>{
                submissao.data = Util.firestoreDateToDate(submissao.data);
                return submissao;
            })



            let submissoesFiltradas = submissoes.filter(submissao=>{
                if(submissao.data.getDate() > dataEncerramento.getDate()){
                    return false;
                }else{
                    return true;
                }
            })

            submissoesFiltradas.sort((s1, s2)=>{

                if(s1.data < s2.data){
                    return 1;
                }else if(s2.data < s1.data){
                    return -1;
                }else{
                    return 0;
                }
            });

            let submissoesTambemForaPrazo = submissoes;

            submissoesTambemForaPrazo.sort((s1, s2)=>{

                if(s1.data < s2.data){
                    return 1;
                }else if(s2.data < s1.data){
                    return -1;
                }else{
                    return 0;
                }
            });



            let finalizada = questao.questao.isFinalizada(submissoesFiltradas[0], 0.85)
            let finalizadaForaPrazo = questao.questao.isFinalizada(submissoesTambemForaPrazo[0], 0.85)
            observer.next({prazo:finalizada, foraPrazo:finalizadaForaPrazo});
            observer.complete();

        });
    })
}

describe('Testes de questão', () => {
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



    it("Deve pegar o status de realização uma atividade em grupo", (done)=>{
        Assunto.get("hxPUrDutCr9KNR9zGLr8").subscribe(assunto=>{

            // Forca
            let questao = assunto.getQuestaoColaborativaById("20019e88-2ba0-4bf5-83ae-08dce48a68af");

            AtividadeGrupo.get("yHWBuTe0IwFLmqfhYlnm").subscribe(atividadeGrupo=>{

                let grupos = new Map();
                atividadeGrupo.grupos.forEach(grupo => {
                    let consultas = [];

                    grupo.estudantes.forEach(estudante=>{
                        consultas.push(isFinalizada(questao, estudante, Util.firestoreDateToDate(atividadeGrupo.data)))
                    })


                    forkJoin(consultas).subscribe(resultados=>{
                        console.log("Grupo: "+grupo.id+" Estudantes: "+grupo.estudantes);
                        console.log(JSON.stringify(resultados));
                        //grupos.set(grupo.id, resultados)
                    });

                });
            })










            //
        })
        //Submissao.getAll([new Query("questaoId", "==", "d71b2ce8-2a29-4424-8f87-5eae8b37b3d9"), new Query("estudanteId", "==", "uqqsPnUvjguXc5nPAGtV")]).subscribe(submissoes=>{




    })
});
 */
