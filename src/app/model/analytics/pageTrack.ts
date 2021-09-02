import { forkJoin, Observable } from 'rxjs';
import { Collection, date, Document } from '../firestore/document';
import Query from '../firestore/query';
import Usuario from '../usuario';
import { Cacheable } from 'ts-cacheable';
import { PerfilUsuario } from '../enums/perfilUsuario';
import Grupo from '../cscl/grupo';
import { Groups } from '../experimento/groups';
import { Util } from '../util';

import * as firebase from 'firebase';

@Collection('pageTrack')
export default class PageTrackRecord extends Document {
  @date()
  data;

  constructor(id, public pagina, public estudante) {
    super(id);
  }

  objectToDocument() {
    const document = super.objectToDocument();

    if (this.estudante != null && this.estudante.pk() != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    return document;
  }

  @Cacheable()
  static getAll(query = null, orderBy = null): Observable<any[]> {
    return super.getAll(query, orderBy);
  }

  
  static getAllByEstudantes(estudantes:Usuario[], merge = true, type="array"):Observable<any>{
    return new Observable(observer=>{
      let consultas;
      if(type == "array"){
        consultas = [];
      }else{
        consultas = {};
      }

      if(Array.isArray(estudantes)){
        estudantes.forEach(estudante=>{
          if(type == "array"){
            consultas.push(PageTrackRecord.getAll(new Query('estudanteId', '==', estudante.pk())));
          }else{
            consultas[estudante.pk()] = PageTrackRecord.getAll(new Query('estudanteId', '==', estudante.pk()));
          }
          
        })
      }

      let arrayDivididoPrimeiraParte = consultas.slice(0, 10)

      let arrayDivididoSegundaParte = consultas.slice(10, 20)

      let arrayDivididoTerceiraParte = consultas.slice(20, 30)

      let arrayDivididoQuartaParte = consultas.slice(30, 40)

      let arrayDivididoQuintaParte = consultas.slice(40)

      forkJoin(arrayDivididoPrimeiraParte).subscribe(pageTracksPrimeiro=>{

        forkJoin(arrayDivididoSegundaParte).subscribe(pageTracksSegunda=>{

          forkJoin(arrayDivididoTerceiraParte).subscribe(pageTracksTerceira=>{

            forkJoin(arrayDivididoQuartaParte).subscribe(pageTracksQuarta=>{

              forkJoin(arrayDivididoQuintaParte).subscribe(pageTracksQuinta=>{
                let pageTracks = pageTracksPrimeiro.concat(pageTracksSegunda, pageTracksTerceira, pageTracksQuarta, pageTracksQuinta);

                if(type == "array"){
                  if(merge){ // Combina em um único array
                    observer.next([].concat.apply([], pageTracks));
                    observer.complete();
                  }else{
                    observer.next(pageTracks);
                    observer.complete();
                  }
                }else{
                  observer.next(pageTracks);
                  observer.complete();
                }
                });
              });

               

            
          });

        });

        
        
        
        
        
      });
    })

    
    
  }

  toJson(){
    return {id:this.id, pagina:this.pagina, estudante:this["estudanteId"], data:Util.firestoreDateToDate(this.data)};
  }

  

  static agruparPorSemana(pageTracks:PageTrackRecord[]){
    function getWeekNumber(date){
      let onejan = new Date(date.getFullYear(),0,1) as any;
      let millisecsInDay = 86400000;
      return Math.ceil((((date - onejan) /millisecsInDay) + onejan.getDay()+1)/7);

      
    };

    let mapaSemanas = new Map<number, Map<string, number>>();
    pageTracks.forEach(pTrack=>{
      let data = Util.firestoreDateToDate(pTrack.data);
      let semana = getWeekNumber(data);
      let mapaSemana = mapaSemanas.get(semana);
      if(mapaSemana == null){
        mapaSemanas.set(semana, new Map());
      }

      mapaSemana = mapaSemanas.get(semana);
      let totalVisualizacoes = mapaSemana.get(pTrack.pagina);
      if(totalVisualizacoes == null){
        mapaSemana.set(pTrack.pagina, 0);
      }  

      totalVisualizacoes = mapaSemana.get(pTrack.pagina);
      mapaSemana.set(pTrack.pagina, totalVisualizacoes+1);

    });

    return mapaSemanas;
  }

  static fromJson(pageTrackJson){
    let track = new PageTrackRecord(pageTrackJson.id, pageTrackJson.pagina, Usuario.fromJson({id:pageTrackJson.estudante}));
    /* track.data = Util.firestoreDateToDate(pageTrackJson.data); */
    //track.data = new firebase.firestore.Timestamp(pageTrackJson.data.seconds, pageTrackJson.data.nanoseconds);
    
    track.data = new Date(pageTrackJson.data);
    return track;
  }

  static contarVisualizacoesPorPagina(pageTracks:PageTrackRecord[]){
    let contagem = {};
    if(Array.isArray(pageTracks)){
      pageTracks.forEach(pageTrack=>{
        if(contagem[pageTrack.pagina] == null){
          contagem[pageTrack.pagina] = 0;
        }
        contagem[pageTrack.pagina] += 1

      })
    }

    return contagem;
  }

  static mergePageTracks(){

  }

}
