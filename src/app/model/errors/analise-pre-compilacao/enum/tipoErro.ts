export enum TipoErro {
  condicao = "Condição",
  repeticao = "Repetição",
  espacoNoNomeVariavel = 3,
  variavelNaoDeclarada = 4,
  faltaParentesis = 5,
  faltaVirgulaParametros = 6,
  parDadosComparacao = 7,
  faltaDoisPontosFuncao = 10,
  numeroDecimalComVirgulaTexto = "Número decimal com vírgula",
  declaracaoVariavelComDoisIguaisTexto = "Declaração de variável com ==",
  espacoNoNomeVariavelTexto = "Variável com espaço no nome",
  variavelNaoDeclaradaTexto = "Uso de variável não declarada",
  faltaParentesisTexto = "Falta de parêntesis em funções",
  faltaVirgulaParametrosTexto = "Falta de vírgula nos parâmetros",
  
  faltaDoisPontosFuncaoTexto = "Falta dois pontos na função",
  /** Condições */
  parDadosComparacaoTexto = "IF sem um par de dados",
  comparacaoApenasUmaIgualdadeTexto = "IF com apenas um =",
  faltaDoisPontosCondicaoTexto = "Falta dois pontos no IF",
  /** Geral */
  erroServidor = "Problema no servidor."
  
}