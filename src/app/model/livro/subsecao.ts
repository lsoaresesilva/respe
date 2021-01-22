import { Document, Collection } from '../firestore/document';
import { Observable } from 'rxjs';
import Sequencia from './sequencia';
import Query from '../firestore/query';

@Collection("subsecoes")
export default class SubSecao extends Document{
    static getAllByAssunto(assunto: any) {
      return new Observable<any[]>();
    }

    constructor(id, secao, sequencia){ // TODO: colocar as chaves que ligam
        super(id);
    }

    static get(id):Observable<any>{
        return new Observable(observer=>{
            Sequencia.getAll([new Query("subsecao_id", "==", id)]).subscribe(sequencias=>{
                super.get(id).subscribe(subsecao=>{
                    subsecao["sequencias"] = sequencias;
                    observer.next(subsecao);
                    observer.complete();
                }, err=>{
                    observer.error(err);
                })
            }, err=>{
                observer.error(err);
            });
        });
    }

    static getAll(query):Observable<any>{{

        return new Observable(observer=>{
            super.getAll(query).subscribe(subsecoes=>{
                subsecoes = SubSecao.ordenar(subsecoes);
                observer.next(subsecoes);
                observer.complete();
            }, err=>{
                observer.error(err);
            })
        });

    }}

    static ordenar(sequencias:Sequencia[]){
        if(Array.isArray(sequencias) ){
            sequencias.sort(function(a,b){
                if(a.sequencia < b.sequencia){
                    return -1;
                }else if(a.sequencia > b.sequencia){
                    return 1;
                }else{
                    return 0;
                }
            })
        
        }

        return sequencias;
    }
}