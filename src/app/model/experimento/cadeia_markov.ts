
import { Observable } from "rxjs";
import PageTrackRecord from "../analytics/pageTrack";
import Query from "../firestore/query";

export default class CadeiaMarkov{

    static construirMatrizTransicaoLowPerforming(){

        let pageTracks = [];

        return new Observable(observer=>{
            PageTrackRecord.getAll(new Query('estudanteId', '==', '4e9cvJOI2t4d1KyxkwWY')).subscribe(
                (pageTracks) => {
        
                  let pTracks = [];
        
                  pTracks.push(pageTracks);
        
                  PageTrackRecord.getAll(new Query("estudanteId", "==", '139MdLNtSKa62Ip83e76')).subscribe(tr=>{
                    pTracks.push(tr);
        
                    PageTrackRecord.getAll(new Query("estudanteId", "==", 'CB6SOLMOQdK7WE1TCFty')).subscribe(tr=>{
                      pTracks.push(tr);
          
                      PageTrackRecord.getAll(new Query("estudanteId", "==", 'EWdvX2ympgrHvMhkFWvE')).subscribe(tr=>{
                        pTracks.push(tr);
            
                        PageTrackRecord.getAll(new Query("estudanteId", "==", 'd6Qx0ydf7quJmGirnF35')).subscribe(tr=>{
                          pTracks.push(tr);
              
                          PageTrackRecord.getAll(new Query("estudanteId", "==", 'erEfwziVvlqZluGBA16Y')).subscribe(tr=>{
                            pTracks.push(tr);
                
                            PageTrackRecord.getAll(new Query("estudanteId", "==", 'f4JGIqpSqiurSdenJ9fi')).subscribe(tr=>{
                              pTracks.push(tr);
                  
                              PageTrackRecord.getAll(new Query("estudanteId", "==", 'uwL18mtNF2M8Iy4DLFio')).subscribe(tr=>{
                                pTracks.push(tr);
                    
                                PageTrackRecord.getAll(new Query("estudanteId", "==", 'y0c15f1wYbqZTrrC7IiR')).subscribe(tr=>{
                                  pTracks.push(tr);
                      
                                  pageTracks = pTracks;
                                  observer.next(pageTracks);
                                  observer.complete();
                                })
                              })
                            })
                          })
                        })
                      })
                    })
        
                    
                  })
        
                  
              });
        })
        
    }
}