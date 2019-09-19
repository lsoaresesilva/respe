import { RespostaQuestaoExperimento } from './respostaQuestaoExperimento';
import Usuario from '../usuario';
import Query from '../firestore/query';
import { Observable, forkJoin } from 'rxjs';
import QuestaoExperimento from './questaoExperimento';
import { TipoQuestaoExperimento } from './tipoQuestaoExperimento';
import { Util } from '../util';

export default class PosTeste {

    static apresentar(usuario: Usuario) {
        return new Observable(observer => {
            // Deve pegar a data da resposta da questão do experimento do tipo pré-teste
            RespostaQuestaoExperimento.getAll(new Query("usuarioId", "==", usuario.pk())).subscribe(respostas => {

                if (respostas.length != 0) {
                    let respondeu = false;
                    for (let i = 0; i < respostas.length; i++) {
                        for (let j = i + 1; j < respostas.length; j++) {
                            if (respostas[i]["questaoId"] == respostas[j]["questaoId"]) {
                                respondeu = true;
                            }
                        }
                    }

                    if (respondeu) {
                        observer.next(false);
                        observer.complete();
                    } else {
                        // verificar a data de uma resposta
                        let diasEntreRespostas = Util.diffBetweenDates(respostas[0]["data"].toDate(), new Date());
                        if (diasEntreRespostas > 2) {
                            observer.next(true);
                            observer.complete();
                        }
                    }


                    /*let questoesSolicitacao = []
                    for (let i = 0; i < respostas.length; i++) {
                        questoesSolicitacao.push(QuestaoExperimento.get(respostas[i]["questaoId"]));
                    }

                    if (questoesSolicitacao.length > 0) {
                        forkJoin(questoesSolicitacao).subscribe(questoes => {
                            // se tiver resposta duplicada significa que já fez o pos-teste
                            for (let i = 0; i < respostas.length; i++) {
                                if (questoes[i]["tipo"] == TipoQuestaoExperimento.posteste) {
                                    observer.next(false);
                                    observer.complete();
                                    break;
                                }
                            }

                            // verificar a data de uma resposta
                            let diasEntreRespostas = Util.diffBetweenDates(respostas[0]["data"].toDate(), new Date());
                            if(diasEntreRespostas > 2){
                                observer.next(true);
                                observer.complete();
                            }
                        })
                    }*/

                } else {
                    observer.next(false);
                    observer.complete();
                }


                // Deve calcular 2 semanas a partir dessa data. Se o dia for hoje, então exibe 
            })

        });
    }
}