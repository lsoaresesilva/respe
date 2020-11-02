import { TipoPontuacao } from './tipoPontuacao';

export default class PontuacaoQuestaoProgramacao implements TipoPontuacao{
    
    getPontuacao() {
        return 20;
    }
}