import Solucao from './solucao';

// ([a-zA-Z_]+)

export default class SolucaoNameError extends Solucao{
    
    mensagem() {
        throw new Error("Method not implemented.");
    }    
    
    localizar() {
        // pegar o tipo da variável da esquerda
        // pegar o tipo da variável da direita
        // pegar do texto de erro
    }


}