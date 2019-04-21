import ErroFactory from './erroFactory';
import { Observable } from 'rxjs';

declare var Sk: any;

/**
 * Encapsula a execução do script Python no navegador. É utilizado para capturar erros de sintaxe no código, antes de enviá-lo para o Backend. 
 * Evita-se assim uma chamada REST desnecessária, pois se o código apresenta esse tipo de erro não faz sentido que os testes sejam executados.
 */
export default class PythonInterpreter{

    constructor(private codigo){

    }


    static runit(codigo, entradas): Observable<any> {

        function builtinRead(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }

        let contadorInput = 0;

        return new Observable(observer => {
            

            // TODO: apagar as cores do editor toda vez que uma nova execução for feita.
            // Editor.getInstance().limparCores();

            Sk.pre = "output";
            let _this = this;

            function outf(texto) {
               

            }

            Sk.configure({ output: outf, read: builtinRead, 
                inputfun: function () {
                    return new Promise(function(resolve,reject){
                        if(entradas.length > 0){
                            let posAtual = contadorInput;
                            contadorInput++;
                            resolve(entradas[posAtual]);
                        }else{
                            resolve();
                        }
                });
                    
             }});

            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, codigo, true);
            });

            myPromise.then(function (mod) {
                observer.next();
                observer.complete();
            }, function (err) {
                let erro = ErroFactory.create(err.toString());

                //envioCodigo.status = false;
                //envioCodigo.erro = erro.toFireStore();

                //_this.prepararSaidaErro(erro);

                observer.next(erro);
                observer.complete();
            });
        });


    }
}