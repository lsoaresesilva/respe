import { Document, ignore, Collection } from '../firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { TipoObjeto } from './tipoObjeto';
import Texto from './texto';
import QuestaoFechada from '../questaoFechada';
import { Questao } from '../questao';

@Collection("sequencias")
export default class Sequencia extends Document{

    @ignore()
    sequencias;

    constructor(id, subsecao, objeto, tipoObjeto){
        super(id);
    }

    static getAll(query):Observable<any[]>{
        let objetos = {}
        return new Observable(observer=>{
            super.getAll(query).subscribe(sequenciasBanco=>{
                sequenciasBanco.forEach(sequencia=>{
                    let id = sequencia["objeto_id"];
                    if(sequencia["tipo"] == TipoObjeto.texto){
                        objetos[sequencia.pk()] = Texto.get(id);
                    }else if(sequencia["tipo"] == TipoObjeto.questaoFechada){
                        objetos[sequencia.pk()] = QuestaoFechada.getByAssuntoQuestao(id);
                    }else if(sequencia["tipo"] == TipoObjeto.questaoProgramacao){
                        objetos[sequencia.pk()] = Questao.getByAssuntoQuestao(id);
                    }
                })

                let chaves = Object.keys(objetos)

                if(chaves.length > 0){
                    forkJoin(objetos).subscribe(resultados=>{
                        Object.keys(resultados).forEach(chave=>{
                            sequenciasBanco.forEach(sequencia=>{
                                if(sequencia.pk() === chave){
                                    sequencia.objeto = resultados[chave]
                                }
                            })
                        })

                        observer.next(sequenciasBanco);
                        observer.complete();
                        
                    })
                }else{
                    observer.next(sequenciasBanco);
                    observer.complete();
                }
            })
        });

    }

    static get(id):Observable<any>{
        return new Observable(observer=>{
            super.get(id).subscribe(sequencia=>{
                if(sequencia["tipo"] == TipoObjeto.texto){
                    Texto.get(sequencia["objeto_id"]).subscribe(texto=>{
                        sequencia["objeto"] = texto;
                        observer.next(sequencia);
                        observer.complete();
                    })
                }
    
                
            })
            
        });
    }
}