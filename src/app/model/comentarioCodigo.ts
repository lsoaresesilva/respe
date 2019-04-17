import { Collection, Document, oneToOne } from './firestore/document';
import Usuario from './usuario';
import Submissao from './submissao';

@Collection("comentariosCodigos")
export default class ComentarioCodigo extends Document{

    @oneToOne({name:"usuarioId", type:Usuario})
    private usuario;
    @oneToOne({name:"submissaoId", type:Submissao})
    private submissao:Submissao


    constructor(id, usuario:Usuario, submissao:Submissao, public texto:string, public linha){
        super(id);
        this.usuario = usuario;
        this.submissao = submissao;
    }



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