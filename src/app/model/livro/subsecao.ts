import { Document, Collection } from '../firestore/document';
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import { TipoConteudoLivro } from '../enums/tipoConteudoLivro';
import Texto from './texto';
import { Assunto } from '../assunto';

@Collection("subsecoes")
export default class SubSecao extends Document{

    sequencia;

    constructor(id, nome, secao, conteudos){ 
        super(id);
    }

    static construirConteudos(conteudosDocument, assunto){
        
        if(assunto != null && Array.isArray(conteudosDocument)){
            
            let conteudos = [];
            conteudosDocument.forEach(conteudo=>{
                if(conteudo.tipo == TipoConteudoLivro.texto){
                    let texto = new Texto(conteudo.sequencia, conteudo.texto);
                    texto["tipo"] = TipoConteudoLivro.texto;
                    conteudos.push(texto);
                }else if(conteudo.tipo == TipoConteudoLivro.questaoProgramacao){
                    let questao = assunto.getQuestaoProgramacaoById(conteudo.questaoId);
                    if(questao != null){
                        conteudos.push(questao);
                        questao["tipo"] = TipoConteudoLivro.questaoProgramacao;
                    }

                }else if(conteudo.tipo == TipoConteudoLivro.questaoFechada){
                    let questao = assunto.getQuestaoFechadaById(conteudo.questaoId)
                    if(questao != null){
                        conteudos.push(questao);
                        questao["tipo"] = TipoConteudoLivro.questaoFechada;
                    }
                }
            })

            return conteudos;
        }
        
    }

    static getWithAssunto(id, assunto):Observable<any>{
        return new Observable(observer=>{
            super.get(id).subscribe(subsecao=>{
                if(subsecao["conteudos"] != null){
                    subsecao["conteudos"] = this.construirConteudos(subsecao["conteudos"], assunto);
                }
                observer.next(subsecao);
                observer.complete();
            }, err=>{
                observer.error(err);
            });
        });
    }

    static getAllByAssunto(assunto):Observable<any>{{

        return new Observable(observer=>{
            super.getAll(new Query("assuntoId", "==", assunto.pk())).subscribe(subsecoes=>{
                subsecoes = SubSecao.ordenar(subsecoes);
                subsecoes.forEach(subsecao=>{
                    if(subsecao["conteudos"] != null){
                        subsecao["conteudos"] = this.construirConteudos(subsecao["conteudos"], assunto);
                    }
                })
                observer.next(subsecoes);
                observer.complete();
            }, err=>{
                observer.error(err);
            })
        });

    }}

    static ordenar(subsecoes:SubSecao[]){
        if(Array.isArray(subsecoes) ){
            subsecoes.sort(function(a,b){
                if(a.sequencia < b.sequencia){
                    return -1;
                }else if(a.sequencia > b.sequencia){
                    return 1;
                }else{
                    return 0;
                }
            })
        
        }

        return subsecoes;
    }
}