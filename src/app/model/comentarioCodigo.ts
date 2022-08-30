import { Collection, Document, oneToOne } from './firestore/document';
import Usuario from './usuario';
import Submissao from './submissao';

@Collection("comentariosCodigos")
export default class ComentarioCodigo extends Document{



    constructor(id, public usuario:Usuario, public submissao:Submissao, public texto:string, public linha){
        super(id);
    }



    /**
     * Agrupa os comentários que foram realizados em uma mesma linha
     * @param comentarios
     */
    static agrupar(comentarios:ComentarioCodigo[]){
        // criar posições por linha
        if(comentarios != undefined && comentarios != null){
            // se for uma linha que já existe, colocar nesse array
            let agrupamento = {};
            comentarios.forEach(comentario=>{
                if(!(comentario.linha in agrupamento)){
                    agrupamento[comentario.linha] = [];

                }

                agrupamento[comentario.linha].push(comentario)
            })

            let agrupamentos:ComentarioCodigo[] = []
            for(let key in agrupamento){
                agrupamentos.push(agrupamento[key]);
            }

            return agrupamentos;
        }

    }

}
