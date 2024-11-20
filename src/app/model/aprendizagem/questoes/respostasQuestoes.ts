import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import Submissao from './respostaQuestaoProgramacao';
import { RespostaQuestaoParson } from './respostaQuestaoParson';
import { VisualizacaoRespostasQuestoes } from './visualizacaoRespostasQuestoes';
import RespostaQuestaoProgramacao from './respostaQuestaoProgramacao';
export default class RespostasQuestoes {
  questoesFechadas: RespostaQuestaoFechada[];
  questoesProgramacao: {
    submissoes: RespostaQuestaoProgramacao[],
    visualizacoesRespostas: VisualizacaoRespostasQuestoes[]
  };
  questoesParson: RespostaQuestaoParson[];
}
