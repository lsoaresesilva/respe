import { CategoriaErro } from '../enum/categoriasErro';

/**
 * Representa um dado do histograma de erros de compilação organizados por meses.
 */
export default class FrequenciaErro{
    contagem;

    constructor(public categoriaErro:CategoriaErro){
        this.contagem = 0;
    }

    /**
     * Retorna o número top de erros cometidos pelo estudante.
     * @param erros 
     * @param top 
     */
    static getTopErros(erros:FrequenciaErro[], top = 2){
        if(erros != null && Array.isArray(erros)){
            erros.sort(function(frequenciaA, frequenciaB){
                return frequenciaB.contagem - frequenciaA.contagem;
            });

            return erros;
        }

        return null;
    }

    static calcularFrequenciaPorTipoErro(erros): any {
        

        let nameError = new FrequenciaErro(CategoriaErro.nameError);
        let syntaxError = new FrequenciaErro(CategoriaErro.syntaxError);
        let typeError = new FrequenciaErro(CategoriaErro.typeError);
        let indentationError = new FrequenciaErro(CategoriaErro.indentationError);

        let resultados = [nameError, syntaxError, typeError, indentationError];

        erros.forEach(erro => {

            if (erro.categoria == CategoriaErro.nameError) {
                nameError.contagem += 1;
            } else if (erro.categoria == CategoriaErro.syntaxError) {
                syntaxError.contagem += 1;
            } else if (erro.categoria == CategoriaErro.typeError) {
                typeError.contagem += 1;
            } else if (erro.categoria == CategoriaErro.indentationError) {
                indentationError.contagem += 1;
            }
        })

        

        return resultados;
    }

}