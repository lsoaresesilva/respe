import { TipoErro } from './tipoErro';

export default class Erro{

    constructor(private linha, private mensagem, private tipo:TipoErro){

    }
}