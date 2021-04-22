export enum ErrosVariaveis {
    stringSemAspas = "Você declarou uma string, mas esqueceu de incluir as duas aspas (aberta e fechamento)",
    numeroDecimalComVirgula = "Você declarou uma variável com número decimal e utilizou , (vírgula) quando deveria ter usado . (ponto)",
    declaracaoVariavelComDoisIguais = "Você declarou uma variável com dois == (igualdades) quando deveria ter usado apenas um =",
    espacoNomeVariavel = "Você utilizou espaço no nome de uma variável e isso não é permitido",
    variavelNAoDeclarada = "Você tentou utilizar uma variável que não foi declarada"
}