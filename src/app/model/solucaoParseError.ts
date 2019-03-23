import Solucao from './solucao';

export default class SolucaoParseError extends Solucao {

    constructor(erro, codigo){
        super(erro, codigo);
    }

    
    mensagem() {
        return "";
    }

    localizar() {
        // TODO: fazer a análise dos códigos e propor sugestões para os problemas...
        /*if(this.erro.erros != null && this.erro.erros.length > 0){
            // se for do tipo parênteses
            
        }*/
    }

 

    


}