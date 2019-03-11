export default class Codigo {

    algoritmo?;
    

    constructor() {
       
    }

    setAlgoritmo(algoritmo){
      this.algoritmo = algoritmo;
    }

    identificarFuncoes() {
        let padrao = /def ([a-zA-Z_-]+)\(.*\)/g
        let consulta = this.algoritmo.match(padrao);
        let funcoes = [];
        if (consulta != null && consulta.length > 0) {
            funcoes = consulta.map(funcao => {
                return funcao.replace(/def ([a-zA-Z_-]+)\(.*\)/g, "$1");
            })

        }

        return funcoes;
    }

    identificarVariaveis() {
        let padrao = /([a-zA-Z_-]+) = /g
        let consulta = this.algoritmo.match(padrao);
        let variaveis = []
        if (consulta != null && consulta.length > 0) {
          variaveis = consulta.map(variavel => {
            return variavel.replace(/([a-zA-Z_-]+) = /g, "$1");
          })
        }
        
        return variaveis;
    
      }

      localizarLinha(sintaxe){
        //let linhasAlgoritmo = this.algoritmo.match(/[^\r\n]+/g);
        let linhasAlgoritmo = this.linhasAlgoritmo();
        for(let i = 0; i < linhasAlgoritmo.length; i++){
          
            let consulta = linhasAlgoritmo[i].match(sintaxe);
            if (consulta != null) {
              return i+1; // incrementa 1, pois o array começa em 0 e as linhas começam em 1.
            }
        } 

        return -1;
      }

      getCodigoLinha(linha){
        let linhasAlgoritmo = this.linhasAlgoritmo();
        if(linhasAlgoritmo != null && (linha-1 > linhasAlgoritmo.length || linha < 0)){
          return null;
        }else{
          return linhasAlgoritmo[linha-1];
        }
      }

      linhasAlgoritmo(){
        return this.algoritmo.split("\n");
      }
}