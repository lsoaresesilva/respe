import { Document, Collection } from '../firestore/document';
import { Observable } from 'rxjs';
import Sequencia from './sequencia';
import Query from '../firestore/query';

@Collection("subsecoes")
export default class SubSecao extends Document{

    constructor(id, secao, sequencia){
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
}