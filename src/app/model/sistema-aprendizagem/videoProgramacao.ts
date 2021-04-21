import { Observable } from "rxjs";
import { Assunto } from "../assunto";
import { Collection, Document } from "../firestore/document";

@Collection("videosProgramacao")
export default class VideoProgramacao extends Document{

    constructor(id, public link, public sequencia, public nome, public descricao, public assunto:Assunto){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();

        if(this.assunto != null){
            document["assuntoId"] = this.assunto.pk();
        }

        return document;
    }

    static getAll(query = null, orderBy = null): Observable<any[]> {

        return new Observable(observer=>{
          super.getAll(query, orderBy).subscribe(videos=>{
              if(videos.length > 0){
                  videos.sort((videoA, videoB)=>{
                      if(videoA.sequencia < videoB.sequencia){
                          return -1;
                      }else if(videoA.sequencia > videoB.sequencia){
                          return 1;
                      }else{
                          return 0;
                      }
                  })
              }

              observer.next(videos);
              observer.complete();
          })
        })
      }

}