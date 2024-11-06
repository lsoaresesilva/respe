import { Injectable } from '@angular/core';
declare var Sk: any;

@Injectable({
  providedIn: 'root'
})
export class InterpretadorPythonService {

  constructor() { }

  async runPythonCodeAndCompare(submissao: any, questao: any): Promise<{ status: boolean, resultados: any }> {
    /* return new Promise(async (resolve, reject) => { */
      const userCode = submissao.codigo;
      const expectedOutput = questao.testsCases[0].saida;
      /* const inputs = [...questao.testsCases[0].entradas]; */

      const testCases = questao.testsCases;

      const resultados = [];

      /* let outputBuffer = ""; */

      for (const testCase of testCases) {
        const inputs = [...testCase.entradas]; // Copia as entradas do test case atual
        const expectedOutput = testCase.saida;
        let outputBuffer = "";
  
        // Configurações do Skulpt para capturar a saída do código Python
        Sk.configure({
          output: (text: string) => { outputBuffer += text; },
          read: (filename: string) => {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
              throw new Error("Arquivo não encontrado: " + filename);
            }
            return Sk.builtinFiles["files"][filename];
          }
        });
  
        // Substitui o comportamento do input para usar valores pré-definidos de inputs
        Sk.inputfun = function(args){
          let response = inputs.shift()
          return response;
        }
  
  
        try {
          // Executa o código Python
          await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, userCode, true));
  
          // Verifica se a saída do algoritmo corresponde à saída esperada
          const isCorrect = outputBuffer.trim() === expectedOutput.trim();
  
          // Armazena o resultado da execução
          resultados.push({
            entrada: testCase.entradas.join(", "), // Junta todas as entradas para esse caso de teste
            respostaAlgoritmo: [outputBuffer.trim()],
            status: isCorrect,
            testCaseId: testCase.id
          });
  
        } catch (error) {
          console.error("Erro na execução do código Python para entrada:", testCase.entradas, error);
          resultados.push({
            entrada: testCase.entradas.join(", "),
            respostaAlgoritmo: [`Erro: ${error.message}`],
            status: false,
            testCaseId: testCase.id
          });
        }
      }

      const statusGeral = resultados.every(result => result.status);

      return {
        status: statusGeral,
        resultados: resultados
      };
  

      // Configurações do Skulpt para capturar a saída do código Python
      /* Sk.configure({
        output: (text: string) => { outputBuffer += text; },
        read: (filename: string) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
            throw new Error("Arquivo não encontrado: " + filename);
          }
          return Sk.builtinFiles["files"][filename];
        }
      });

      Sk.builtin.input = () => {
        if (inputs.length === 0) {
          throw new Error("Mais chamadas de input() do que entradas fornecidas.");
        }
        return inputs.shift(); // Retira e retorna o próximo valor de entrada
      };

      Sk.inputfun = function(args){
        let response = inputs.shift()
        return response;
      }




      // Executa o código Python
      Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, userCode, true))
        .then(() => {
          // Compara a saída com a saída esperada
          const result = {
            status: outputBuffer.trim() === expectedOutput.trim(),
            respostaAlgoritmo: outputBuffer.trim()
          };
          resolve(result); // Retorna true se as saídas forem iguais, false caso contrário
        })
        .catch((error: any) => {
          console.error("Erro na execução do código Python:", error);
          reject(error);
        }); */
    /* }); */
  }
}
