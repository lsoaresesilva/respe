import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';
import { Questao } from './questao';
import Query from './firestore/query';
import { RespostaSimilarQuestaoProgramacaoComponent } from '../srl/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import { observable, Observable } from 'rxjs';



@Collection("respostaQuestaoFechada")
export class RespostaQuestaoFechada extends Document{
    estudante: Usuario;
    resposta :String;
    questao: Questao;

    constructor(public id, estudante,resposta,questao){
        super(id);

        this.estudante=estudante;
        this.resposta=resposta;
        this.questao=questao;
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        document["usuarioId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id;
        return document;
    }


       jaRespondeu(questaoId,usuarioId):Observable<String>{
        return new Observable(observer => {
            
            RespostaQuestaoFechada.getAll(new Query("usuarioId","==",usuarioId)).subscribe(respostas => {

                if(respostas.length>0){
                    respostas.forEach(result=>{ 

                   
                        if(result.questaoId == questaoId ){
                            observer.next(result.resposta);
                            observer.complete();
                            
                        }
                    });
                }
            
           });

           //observer.next(null);
           //observer.complete();

        });
        
    }

    


}