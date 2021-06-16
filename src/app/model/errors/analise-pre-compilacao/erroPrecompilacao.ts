
export default class ErroPreCompilacao{
    constructor(public linha, public mensagem, public tipoErro){

    }

    construirMensagem(){
        return "Seu algoritmo possui um erro: "+this.mensagem+", na linha "+this.linha+"."; 
    }

    
}