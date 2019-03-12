import Codigo from './codigo';

export default abstract class Solucao{
    erro;
    linha;
    trecho;

    constructor(erro){
        this.erro = erro;
        this.localizar();
    }
    
    abstract mensagem();
    abstract localizar();
}