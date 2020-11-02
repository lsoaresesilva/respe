import { TipoPontuacao } from './tipoPontuacao';

export default class PontuacaoQuestaoFechada implements TipoPontuacao{
    
    getPontuacao() {
        return 10;
    }
}