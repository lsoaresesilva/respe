import Submissao from "../submissao";
import Usuario from "../usuario";
import PageTrackRecord from "./pageTrack";

export default class EstatisticasProgramacao{



    

    /**
     * Recebe um objeto com submissões dos estudantes, sendo cada estudante um atributo deste objeto.
     * Analisa em quais situações ele refatorou o código após um envio com sucesso.
     * @param submissoes 
     * @returns 
     */
    static identificarMelhoriasSubmissaoAposConclusao(submissoes:object){
        let mapa = new Map<string, number>();
        let submissoesAgrupada = new Map<string, Map<string, Submissao[]>>();
        for (let [estudanteId, s] of Object.entries(submissoes)) {
            submissoesAgrupada.set(estudanteId, Submissao.agruparPorQuestao(s));
        }

        submissoesAgrupada.forEach((submissoesEstudantesAgrupadasQuestao, estudanteId)=>{
            submissoesEstudantesAgrupadasQuestao.forEach((submissoesQuestao, questaoId)=>{
                let submissoesconcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
                if(submissoesconcluidas.length > 1){
                    let isDiff = false;
                    let codigo = "";
                    submissoesconcluidas.forEach(submissao=>{
                        if(codigo == ""){
                            codigo = submissao.codigo;
                        }else{
                            if(submissao.codigo != codigo){
                                isDiff = true;
                            }
                        }
                    })

                    if(isDiff){
                        let estudante = submissoesQuestao[0].estudante;
                        let total = mapa.get(estudante.pk());
                        if(total == null){
                            mapa.set(estudante.pk(), 0);
                        }

                        total = mapa.get(estudante.pk());
                        mapa.set(estudante.pk(), total+1);
                        
                    }
                }
            });
        });

        return mapa;
    }
}