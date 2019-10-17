import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';
import { Questao } from './questao';
import Query from './firestore/query';
import { RespostaSimilarQuestaoProgramacaoComponent } from '../srl/monitoramento/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import { observable, Observable } from 'rxjs';
import Alternativa from './alternativa';



@Collection("respostaQuestaoFechada")
export class RespostaQuestaoFechada extends Document {
    estudante: Usuario;
    alternativa: Alternativa;
    questao: Questao;

    constructor(public id, estudante, alternativa, questao) {
        super(id);

        this.estudante = estudante;
        this.alternativa = alternativa;
        this.questao = questao;

    }

    objectToDocument() {
        let document = super.objectToDocument()
        document["usuarioId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id;
        document["alternativaId"] = this.alternativa.id;
        return document;
    }

   
    static getAll(query): Observable<any[]>{
        return new Observable(observer=>{
            super.getAll(query).subscribe(respostas=>{
                respostas.forEach(resposta=>{
                    resposta["alternativa"] = new Alternativa(resposta["alternativaId"], null, null);
                });

                observer.next(respostas);
                observer.complete();
            }, err=>{
                observer.error(err);
            });
        })
        
    }

    static getRespostaQuestaoEstudante(questao, usuario): Observable<String> {
        return new Observable(observer => {

            RespostaQuestaoFechada.getAll([new Query("usuarioId", "==", usuario.pk()), new Query("questaoId", "==", questao.id)]).subscribe(respostaSalva => {

                if(respostaSalva.length > 0){
                    observer.next(respostaSalva[0]);
                }else{
                    observer.next(null);
                }
                
                observer.complete();
            });
        });

    }

    getTodasRespostasQuestoesFechadasEstudante(usuario){
        return new Observable(observer=>{
            RespostaQuestaoFechada.getAll(new Query("usuarioId", "==", usuario.pk())).subscribe(respostas => {
                observer.next(respostas);
                observer.complete();
            });
        }) 
    }




}