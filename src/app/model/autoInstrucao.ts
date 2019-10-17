import Usuario from './usuario';
import { Assunto } from './assunto';
import Estudante from './estudante';
import { Document, Collection } from './firestore/document';
import { Dificuldade } from './enums/dificuldade';
import { Questao } from './questao';
import { Observable } from 'rxjs';
import Query from './firestore/query';

@Collection("autoInstrucao")
export class AutoInstrucao extends Document{
    estudante:Usuario;
    questao:Questao;
    problema;
    variaveis;
    condicoes;
    repeticoes;
    funcoes;
    vetores;

    constructor(id, estudante, questao, problema, variaveis, condicoes, repeticoes, funcoes, vetores){
        super(id);
        this.estudante = estudante;
        this.questao = questao;
        this.problema = problema;
        this.variaveis = variaveis;
        this.condicoes = condicoes;
        this.repeticoes = repeticoes;
        this.funcoes = funcoes;
        this.vetores = vetores;
    }

    objectToDocument(){
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id; // TODO: incluir também o assuntoID
        return document;
    }

    static getAutoInstrucao(estudanteId, questaoId) :Observable <AutoInstrucao>{
        
        return new Observable (observer =>{

            AutoInstrucao.getAll([new Query("estudanteId","==",estudanteId), new Query("questaoId", "==", questaoId)]).subscribe(autoInstrucoesEstudante =>{
                if(autoInstrucoesEstudante.length > 0){
                    autoInstrucoesEstudante[0].estudante = new Usuario(autoInstrucoesEstudante[0].estudanteId, null, null, null);
                    observer.next(autoInstrucoesEstudante[0]);
                }else{
                    observer.next(null);
                }
                observer.complete();
            });

        });
    }
}