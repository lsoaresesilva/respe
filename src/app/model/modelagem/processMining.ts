import { PageTrack } from "src/app/guards/pageTrack.guard";
import { EventosProgramacao } from "../analytics/enum/eventosProgramacao";
import PageTrackRecord from "../analytics/pageTrack";
import { ErroCompilacao } from "../errors/analise-compilacao/erroCompilacao";
import ErroCompilacaoFactory from "../errors/analise-compilacao/erroCompilacaoFactory";
import { QuestaoProgramacao } from "../sistema-aprendizagem/questoes/questaoProgramacao";
import Submissao from "../submissao";
import Usuario from "../usuario";

/* 
        1. Agrupar submissões por questão
        2. Ordenar submissões
        3. Pegar a submissão 
            3a. Possui erro de sintaxe? Classificar como (CES)
                Sim:
                    3aa. Existem submissões a seguir?
                        3aaa. Sim:
                            3.aaaa. Próxima submissão resultou em correção do problema? 
                                3.aaaa. Sim: (para erro de sintaxe verificar o atributo erro, para erro lógico verificar se os testes cases foram concluídos)
                                    Classificar como (CC)
                                        Ir ára 3a. "Possui erro Sintaxe?"
                                3.aaab. Não: 
                                    3.aaaba. É o mesmo erro? 
                                        3. aaabaa. Sim: Classificar como (CME)
                                        3. aaabab. Não: COE
                        3aab. Não:
                            Classificar como (D)
                        3aab. Não existem mais submissões? Classificar como (D)
            3b. 	Não :
                3ba. Concluiu a questão? 
                    Sim: Classificar como (CF)
                    Não: Classificar como (CEL)
                        Ir para "Existem submissões a seguir?"
        */

// A FAZER:
// PEgar as transições de página entre o desenvolvimento do algoritmo e incluir no processo
// Por exemplo: se durante a criação de um algoritmo o estudante voltou para o planejamento ou foi fazer outra coisa
export default class ProcessMining{

    static criarEvento(estudante:Usuario, action, data, questao:QuestaoProgramacao){
        return {case:estudante.pk(), action:action, datetime:Math.round(data.getTime()/1000), questaoId:questao.id}
    }

    static extrairPageTracksIntervaloDate(submissaoInicial, submissaoFim, pageTracks:PageTrackRecord[]){
        let paginas = [];
        pageTracks.forEach(pageTrack=>{
            if(submissaoInicial != null && submissaoFim != null){
                if(pageTrack.data  >= submissaoInicial.data &&  pageTrack.data <= submissaoFim.data ){
                    paginas.push(pageTrack);
                }
            }
            
        })

        return paginas;
    }

    static _excluirRuidoPageTrack(pTrack){
        if(pTrack.pagina == "index" || pTrack.pagina == "ranking" || pTrack.pagina == "listagem-atividade-grupo" || pTrack.pagina == "entrar-grupo"){
            return true;
        }

        return false;
    }

    static _criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, questao){
        if((pageTracksEntreSubmissoes.length > 0)){
            pageTracksEntreSubmissoes.forEach(pTrack=>{
                if(!this._excluirRuidoPageTrack(pTrack)){
                    eventos.push(this.criarEvento(pTrack.estudante, pTrack.pagina, pTrack.data, questao))
                }
                
            })
        }
    }

    static _identificarEventos(posicao, submissoes:Submissao[], pageTracks:PageTrackRecord[]){
        let eventos = [];
        let submissaoAnterior = submissoes[posicao-1];

        let submissaoAtual = submissoes[posicao];
        let submissaoSeguinte = submissoes[posicao+1];
        let diferencaTempo;

        // A diferença de tempo é grande. Significa que é uma submissão de outro momento
        if(submissaoSeguinte != null){
            diferencaTempo = (submissaoSeguinte.data.getTime() - submissaoAtual.data.getTime()) / 1000;
         
        }

        let pageTracksEntreSubmissoes = [];
        if(submissaoAtual.data.getDate() == "22"){
            pageTracksEntreSubmissoes = this.extrairPageTracksIntervaloDate(submissaoAtual, submissaoSeguinte, pageTracks);
            let x = pageTracksEntreSubmissoes;
        }
        
        
        if(diferencaTempo < 300)
            pageTracksEntreSubmissoes = this.extrairPageTracksIntervaloDate(submissaoAtual, submissaoSeguinte, pageTracks);
        
        /* if(submissaoAtual.hasErroSintaxe()){
            if(submissaoAnterior == null){
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_erro_sintaxe, submissaoAtual.data, submissaoAtual.questao));
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }else{
                // erro anterior
                if(submissaoAnterior.erro != null && submissaoAnterior.erro.traceback != null){
                    let erroAnterior = ErroCompilacaoFactory.construir(submissaoAnterior.erro.traceback);
                    let erroAtual = ErroCompilacaoFactory.construir(submissaoAtual.erro.traceback);
                    if(ErroCompilacao.getCategoria(erroAnterior.categoria) == ErroCompilacao.getCategoria(erroAtual.categoria)){
                        //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_mesmo_erro, datetime:submissaoAtual.data});
                        eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_mesmo_erro, submissaoAtual.data, submissaoAtual.questao))
                        this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
                    }else{
                        //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_outro_erro, datetime:submissaoAtual.data});
                        eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_outro_erro, submissaoAtual.data, submissaoAtual.questao))
                        this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
                    }

                    
                }else{
                    //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_erro_sintaxe, datetime:submissaoAtual.data});
                    eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_erro_sintaxe, submissaoAtual.data, submissaoAtual.questao))
                    this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
                }
                
            }
            
            if(submissaoSeguinte != null){
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
                eventos = eventos.concat(this._identificarEventos(posicao+1, submissoes, pageTracks));
                
            }else{
                //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.desistencia, datetime:submissaoAtual.data})
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.desistencia, submissaoAtual.data, submissaoAtual.questao));
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }
        }else if(!submissaoAtual.isFinalizada()){
            if(submissaoAnterior == null || (submissaoAnterior != null && submissaoAnterior.hasErroSintaxe())){
                //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_erro_logico, datetime:submissaoAtual.data});
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_erro_logico, submissaoAtual.data, submissaoAtual.questao))
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }else if(submissaoAnterior != null && !submissaoAnterior.hasErroSintaxe() && !submissaoAnterior.isFinalizada()){
                //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_erro_logico_continuacao, datetime:submissaoAtual.data});
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_erro_logico_continuacao, submissaoAtual.data, submissaoAtual.questao))
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }
            
            if(submissaoSeguinte != null){
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
                eventos = eventos.concat(this._identificarEventos(posicao+1, submissoes, pageTracks));
                
            }else{
                //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.desistencia, datetime:submissaoAtual.data})
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.desistencia, submissaoAtual.data, submissaoAtual.questao));
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }
        }else{
            //eventos.push({case:submissaoAtual.estudante.pk(), action:EventosProgramacao.codigo_finalizado, datetime:submissaoAtual.data});
            if(submissaoAnterior != null && submissaoAnterior.isFinalizada()){
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.refatoramento, submissaoAtual.data, submissaoAtual.questao));
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }else{
                eventos.push(this.criarEvento(submissaoAtual.estudante, EventosProgramacao.codigo_finalizado, submissaoAtual.data, submissaoAtual.questao));
                this._criarEventosPageTrack(pageTracksEntreSubmissoes, eventos, submissaoAtual.questao);
            }
            
        } */


        return eventos;
    }

    static identificarEventos(submissoes:Submissao[], pageTracks:PageTrackRecord[]){
        let eventos = this._identificarEventos(0, submissoes, pageTracks);
        return eventos;
    }
}