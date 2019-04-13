import Estudante from './estudante';
import { Questao } from './questao';
import Codigo from './codigo';
import { Document, Collection, date } from './firestore/document';
import Erro from './erro';
import { Observable } from 'rxjs';
import Query from './firestore/query';

@Collection("submissoes")
export default class Submissao extends Document{

    @date()
    data;
    codigo:Codigo;
    estudante:Estudante;
    questao:Questao;
    erros:Erro[];

    constructor(id, codigo, estudante, questao){
        super(id);
        this.codigo = codigo;
        this.estudante = estudante;
        this.questao = questao;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["estudanteId"] = this.estudante.pk();
        document["questaoId"] = this.questao.pk();

        return document;
    }

    static get(id){
        return new Observable(observer=>{
            super.get(id).subscribe(submissao=>{
                Erro.getAll(new Query("submissaoId", "==", submissao["id"])).subscribe(erros=>{
                    submissao["erros"] = erros;
                }, err=>{
                    
                }, ()=>{
                    observer.next(submissao);
                    observer.complete();
                });
            }, err=>{
                observer.error(err);
            })
        })
    }

    
}