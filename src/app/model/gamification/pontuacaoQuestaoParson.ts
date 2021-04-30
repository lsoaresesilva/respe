import { TipoPontuacao } from './tipoPontuacao';

export default class PontuacaoQuestaoParson implements TipoPontuacao{
    
    getPontuacao() {
        return 15;
    }
}