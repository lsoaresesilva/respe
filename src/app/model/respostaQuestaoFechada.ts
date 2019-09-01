import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';
import { Questao } from './questao';
import Query from './firestore/query';
import { RespostaSimilarQuestaoProgramacaoComponent } from '../srl/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import { observable, Observable } from 'rxjs';



@Collection("respostaQuestaoFechada")
export class RespostaQuestaoFechada extends Document {
    estudante: Usuario;
    resposta: String;
    questao: Questao;

    constructor(public id, estudante, resposta, questao) {
        super(id);

        this.estudante = estudante;
        this.resposta = resposta;
        this.questao = questao;

    }

    objectToDocument() {
        let document = super.objectToDocument()
        document["usuarioId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id;
        return document;
    }


    getRespostaQuestaoEstudante(questao, usuario): Observable<String> {
        return new Observable(observer => {

            RespostaQuestaoFechada.getAll([new Query("usuarioId", "==", usuario.pk()), new Query("questaoId", "==", questao.id)]).subscribe(respostaSalva => {

                if(respostaSalva.length > 0){
                    observer.next(respostaSalva[0].resposta);
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