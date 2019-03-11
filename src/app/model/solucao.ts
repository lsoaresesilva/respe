import Codigo from './codigo';

export default abstract class Solucao{
    codigo:Codigo;
    erro;
    linha;
    trecho;

    constructor(codigo, erro){
        this.codigo = codigo;
        this.erro = erro;
        this.localizarSolucao();
    }
    
    abstract formatarMensagem();
    abstract localizarSolucao();
}