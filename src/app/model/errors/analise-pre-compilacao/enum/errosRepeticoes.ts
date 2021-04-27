export enum ErrosRepeticoes {
  faltaDoisPontos = "Repetições precisam ter um : no final da linha em que são criadas. Exemplo: for x in range(5):",
  apenasUmParComparacao = "Em um while é preciso comparar um par de informações, mas você escreveu apenas um dado. Exemplo correto: while x <= 10:",
  semComparacao = "Ao utilizar while você precisa incluir uma comparação. Por exemplo: while x <= 10, onde x <= 10 é a comparação",
  andOrMaiusculo = "Você utilizou um operador and ou or, mas escreveu eles em maiúsculo",
  comparacaoApenasUmaIgualdade = "A comparação de um while deve ser feita com dois sinais de == (igualdade), mas você utilizou apenas um =",
  ausenciaDoisPontos = "Em uma repetição é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: for x in range(10):",
  faltaOperadorIn = "Você não utilizou o operador in para iterar sobre uma lista, array, range ou string",
  semParDadosIn = "Faltou um par de dados no uso do operador in. Por exemplo: for x in range(2). Onde, x e range são os dados necessários para iteração",
  sintaxeWhileInvalida = "Você escreveu a sintaxe do while sem uma comparação",
  faltaParentesis = "Você esqueceu de abrir ou fechar um parêntesis"
}