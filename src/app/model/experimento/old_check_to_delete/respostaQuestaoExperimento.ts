import { Document, Collection, date } from '../../firestore/document';
import Usuario from '../../usuario';
import Query from '../../firestore/query';
import QuestaoExperimento from './questaoExperimento';
import { Observable } from 'rxjs';
import { Util } from '../../util';

@Collection("respostasExperimento")
export class RespostaQuestaoExperimento extends Document{

    questao;
    estudante;
    alternativa;
    @date()
    data;

    objectToDocument() {
        let document = super.objectToDocument()
        document["usuarioId"] = this.estudante.pk();
        document["questaoId"] = this.questao.pk();
        document["alternativaId"] = this.alternativa.id;
        return document;
    }

    static isFinalizado(estudante:Usuario){
        let totalRespostas = 0;
        // Carregar todas as respostas
       
        return new Observable(observer=>{
            RespostaQuestaoExperimento.getAll(new Query("usuarioId", "==", estudante.pk())).subscribe(respostas=>{
                QuestaoExperimento.getAll().subscribe(questoes=>{
                    let respondeuTodas = {}
                    for(let i = 0; i < respostas.length; i++){
                        for(let j = 0; j < questoes.length; j++){
                            if(respostas[i]["questaoId"] == questoes[j].pk() && respondeuTodas["questaoId"] == undefined){
                                respondeuTodas["questaoId"] = true;
                            }
                        }
                    }

                    // contar ototal de respondeuTodas. Tem que bater com questoes.length

                     observer.next(Object.keys(respondeuTodas).length==questoes.length?true:false);
                     observer.complete();
                })
            })
            
        })

        
        
    }
}