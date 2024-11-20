import { Injectable } from '@angular/core';
declare var Sk: any;

@Injectable({
  providedIn: 'root'
})
export class InterpretadorPythonService {

  constructor() { }

  async runPythonCodeAndCompare(submissao: any, questao: any): Promise<{ status: boolean, resultados: any }> {
    const userCode = submissao.codigo;
    const testCases = questao.testsCases;
  
    const resultados = [];
  
    for (const testCase of testCases) {
      const inputs = [...testCase.entradas]; // Copia as entradas do test case atual
      const expectedOutputArray = Array.isArray(testCase.saida) ? testCase.saida : [testCase.saida];
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
      Sk.inputfun = function (args) {
        let response = inputs.shift();
        return response;
      };
  
      // Executa o código Python
      await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, userCode, true));
  
      // Divide a saída do algoritmo em linhas e remove espaços em branco
      const outputLines = outputBuffer.trim().split('\n').map(line => line.trim());

      // Verifica se a saída do algoritmo corresponde à saída esperada (todos os elementos)
      const isCorrect = 
        outputLines.length === expectedOutputArray.length && 
        outputLines.every((line, index) => line === expectedOutputArray[index].trim());

      // Armazena o resultado da execução
      resultados.push({
        entrada: testCase.entradas.join(", "), // Junta todas as entradas para esse caso de teste
        respostaAlgoritmo: outputLines,
        status: isCorrect,
        testCaseId: testCase.id
      });
    }
  
    const statusGeral = resultados.every(result => result.status);
  
    return {
      status: statusGeral,
      resultados: resultados
    };
  }
}
