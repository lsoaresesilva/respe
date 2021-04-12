export enum ErrosCondicoes{
    comparacaoElse = "A instrução else não pode ter uma comparação.",
    apenasUmParComparacao = "Em uma condição é preciso comparar um par de informações, mas você escreveu apenas um dado.",
    semComparacao = "Ao utilizar if ou elif você precisa incluir uma comparação. Por exemplo: if x == a, onde x == a é a comparação.",
    andOrMaiusculo = "Você utilizou um operador and ou or, mas escreveu eles maiúsculo",
    comparacaoApenasUmaIgualdade = "A comparação de uma condição deve ser feita com dois sinais de == (igualdade), mas você utilizou apenas um =.",
    ausenciaDoisPontos = "Em uma condição é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: if idade > 18"
}