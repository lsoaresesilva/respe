export class Estatistica{

    dados;

    constructor(dados: any[]){
        this.dados = dados;
    }

    calcularPorTipoErro(): any {
        if(this.dados.length == 0 ){
            return [];
        }

        let resultados = {};

        let nameError = 0;
        
        this.dados.forEach(envioCodigo=>{
            if(envioCodigo.erro != undefined)
                if(envioCodigo.erro.tipo == "NameError"){
                    nameError += 1;
                }
        })

        resultados = {nameError:nameError};
            
        return resultados;
    }



}