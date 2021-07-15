
import { TestBed, inject } from "@angular/core/testing";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { FirebaseConfiguracao } from "src/environments/firebase";
import { DocumentModule } from "../../firestore/document.module";

import pageTracks from '../../../../../json/pageTracks.json';
import submissoes from '../../../../../json/submissoes.json';
import assuntosJson from '../../../../../json/assuntos.json';
import estudantesJson from '../../../../../json/estudantes.json';
import PageTrackRecord from "../pageTrack";
import Submissao from "../../submissao";
import { Assunto } from "../../assunto";
import Usuario from "../../usuario";
import EstatisticaPageTrack from "../../modelagem/estatisticaPageTrack";
import EstatisticasProgramacao from "../estatisticaProgramacao";

describe('Testes para a classe de EstatisticaPageTrack', () => {

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

    
 

  it("Deve retornar os erros das submissões de um estudante", ()=>{

    let estudantes:Usuario[] = [];
    estudantesJson.estudantes.forEach(e=>{
        estudantes.push(Usuario.fromJson(e));
    })

    let pTrack:PageTrackRecord[] = [];

    pageTracks.pageTrack.forEach(p=>{
        pTrack.push(PageTrackRecord.fromJson(p));
    })

    let pageTracksAgrupados = {};

    pTrack.forEach(track=>{
        for(let i = 0; i < estudantes.length; i++){
            if(track.estudante.pk() == estudantes[i].pk()){

                if(pageTracksAgrupados[track.estudante.pk()] == null){
                    pageTracksAgrupados[track.estudante.pk()] = [];
                }

                
                pageTracksAgrupados[track.estudante.pk()].push(track);
                break;
            }
        }
    })
   
    let sMissoes:Submissao[] = [];
    submissoes["submissoes"].forEach(s=>{
        sMissoes.push(Submissao.fromJson(s));
    })

    let submissoesAgrupadas = {};

    sMissoes.forEach(submissao=>{
        for(let i = 0; i < estudantes.length; i++){
            if(submissao.estudante.pk() == estudantes[i].pk()){


                if(submissoesAgrupadas[submissao.estudante.pk()] == null){
                    submissoesAgrupadas[submissao.estudante.pk()] = [];
                }
                submissoesAgrupadas[submissao.estudante.pk()].push(submissao);
                break;
            }
        }
    })

    let assuntos:Assunto[] = [];
    assuntosJson.assuntos.forEach(a=>{
        assuntos.push(Assunto.fromJson(JSON.parse(a)));
    })

   /*  let x = EstatisticasProgramacao.estrategiasSRLsemanas(pageTracksAgrupados);
 */
    let registrosPageTracks = EstatisticaPageTrack.gerarDadosPageTrack(pageTracksAgrupados, assuntos, submissoesAgrupadas);
    console.log(JSON.stringify(registrosPageTracks));

    }) 

});
