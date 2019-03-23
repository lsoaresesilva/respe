import Codigo from './codigo';
import { Error } from './error';

export default abstract class Solucao{
    erro;
    codigo:Codigo;

    linha;
    trecho;

    constructor(erro, codigo){
        this.erro = erro;
        this.codigo = codigo;
        this.localizar();
    }
    
    abstract mensagem();
    abstract localizar();
}