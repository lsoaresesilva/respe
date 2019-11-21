import { Document, Collection, ignore } from '../firestore/document';
import { Observable, forkJoin } from 'rxjs';
import SubSecao from './subsecao';
import Query from '../firestore/query';

@Collection("secoes")
export default class Secao extends Document {

    @ignore()
    subsecoes;

    constructor(id, public assunto, public sequencia) {
        super(id);
    }

    static getAll(query=null): Observable<any> {
        return new Observable(observer => {
            super.getAll(query).subscribe(secoes => {
                let consultasParaSubsecoes = {}
                if (secoes.length > 0) {
                    for (let i = 0; i < secoes.length; i++) {
                        consultasParaSubsecoes[secoes[i].pk()] = SubSecao.getAll(new Query("secao_id", "==", secoes[i].pk()));
                    }


                    if (Object.keys(consultasParaSubsecoes).length > 0) {
                        forkJoin(consultasParaSubsecoes).subscribe(subsecoes => {

                            let chavesSecoes = Object.keys(subsecoes);

                            for (let i = 0; i < chavesSecoes.length; i++) {
                                for (let j = 0; j < secoes.length; j++) {
                                    if (secoes[j].pk() == chavesSecoes[i]) {
                                        secoes[j].subsecoes = subsecoes[chavesSecoes[i]];
                                        break;
                                    }
                                }
                            }

                            observer.next(secoes);
                            observer.complete();
                        })
                    } else {
                        observer.next(secoes);
                        observer.complete();
                    }
                } else {
                    observer.next(secoes);
                    observer.complete();
                }


            })
        })

    }
}