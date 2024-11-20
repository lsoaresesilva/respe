import { forkJoin, Observable } from "rxjs";

import { PerfilUsuario } from "../enums/perfilUsuario";
import { Groups } from "../experimento/groups";

import Submissao from "../aprendizagem/questoes/respostaQuestaoProgramacao";
import Usuario from "../usuario";
import AnalyticsProgramacao from "./analyticsProgramacao";
import PageTrackRecord from "./pageTrack";
import RespostaQuestaoProgramacao from "../aprendizagem/questoes/respostaQuestaoProgramacao";
import Grafo from "../grafo/grafo";
import { Assunto } from "../aprendizagem/questoes/assunto";

export default class Estatisticas{

    static gerarDadosPageTrack(estudantes:Usuario[]){
        return new Observable(observer=>{
            PageTrackRecord.getAllByEstudantes(estudantes, false, "objeto").subscribe(pageTracks=>{
                let registros = [];

                Assunto.getAll().subscribe(assuntos=>{
                    let consultaSubmissoes = {};
                    for(let [estudanteId, tracks] of Object.entries(pageTracks)){
                        let markov = new Grafo(tracks).criar();
                        registros.push(Object.assign({},{estudanteId:estudanteId}, PageTrackRecord.contarVisualizacoesPorPagina(tracks as any)));
                        
                        consultaSubmissoes[estudanteId] = Usuario.getTodasSubmissoes(new Usuario(estudanteId, "", PerfilUsuario.estudante, Groups.experimentalA, ""));
                    }
    
                    forkJoin(consultaSubmissoes).subscribe(submissoes=>{
                        for(let [estudanteId, s] of Object.entries(submissoes)){
                            // Procurar em registro pelo estudante. 
                            
                            // Na sua submissão incluir como um atributo do seu objeto
                            let usuario = new Usuario(estudanteId, "", PerfilUsuario.estudante, Groups.experimentalA, "");
                            let submissoesEstudante = s as RespostaQuestaoProgramacao[];
                            let progresso = AnalyticsProgramacao.calcularProgressoProgramacao(assuntos, submissoesEstudante);
                            registros.forEach(registro=>{
                                if(registro["estudanteId"] == estudanteId){
                                    registro["progresso"] = progresso;
                                }
                            })
                            
                            
                        }

                        observer.next(registros);
                        observer.complete();
                    })
                })
                
                
            })
        })
        
    }
}