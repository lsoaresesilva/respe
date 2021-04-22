/**
 * Representa o console do editor de programação.
 * Usado para três ações:
 *  - Exibir mensagens de erro de compilação
 *  - Exibir erros do servidor (fora do ar, por exemplo)
 *  - Outputs do algoritmo (com o comando print)
 */

 export default class ConsoleEditor{

    erro;
    submissao?;
    saida;
    tracebackOriginal;

    resetarErro(){
       this.erro = null;
       this.tracebackOriginal = null;
    }
 }