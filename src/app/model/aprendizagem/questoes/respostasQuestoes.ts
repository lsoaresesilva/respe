import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import Submissao from '../../respostaQuestaoProgramacao';
import { RespostaQuestaoParson } from './respostaQuestaoParson';
import { VisualizacaoRespostasQuestoes } from './visualizacaoRespostasQuestoes';
export default class RespostasQuestoes {
  questoesFechadas: RespostaQuestaoFechada[];
  questoesProgramacao: {
    submissoes: Submissao[],
    visualizacoesRespostas: VisualizacaoRespostasQuestoes[]
  };
  questoesParson: RespostaQuestaoParson[];
}
