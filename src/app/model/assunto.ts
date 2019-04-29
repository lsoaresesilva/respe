import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import AssuntoQuestao from './assuntoQuestao';
import Query from './firestore/query';

@Collection("assuntos")
export class Assunto extends Document{
 

    constructor(id, public nome, public preRequisitos:Assunto[], public objetivosEducacionais){
        super(id);
    }

    static delete(id){
        return new Observable(observer=>{
            super.delete(id).subscribe(resultadoDelete=>{
                AssuntoQuestao.getAll(new Query("assuntoId", "==", id)).subscribe(resultados=>{
                    let delecoes = [];
                    resultados.forEach(assuntoQuestao=>{
                        delecoes.push(AssuntoQuestao.delete(assuntoQuestao.pk()));
                    })
    
                    if(delecoes.length > 0)
                        forkJoin(delecoes).subscribe(resultados=>{
                            observer.next();
                            observer.complete();
                        }, err=>{
                            observer.error(err);
                        })
                    else{
                        observer.next();
                        observer.complete();
                    }
                })
            })
            
        });
    }
}