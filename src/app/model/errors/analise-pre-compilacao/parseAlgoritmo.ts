import ErroProgramacao from "../../aprendizagem/questoes/erroProgramacao";





export class ErrosExecucao{
  
  constructor(public syntaxError:ErroProgramacao[], public typeError:ErroProgramacao[], public nameError:ErroProgramacao[], public identationError:ErroProgramacao[]){
    
  }


  hasErros(){
    return !Object.values(this).every(errorArray => errorArray.length === 0);
  }
}



export class SyntaxError extends ErroProgramacao{
  constructor(linha, mensagem, categoria) {
    super(linha, mensagem, categoria);
  }

  getMensagemAmigavel() {
    let mensagem = super.getMensagemAmigavel();
    mensagem += "<p>Algumas possíveis causas e sugestões de como resolver: <br/><br/>1) Você utilizou uma condição e está comparando as variáveis/valores com apenas uma igualdade.; ou <br/>2) Você utilizou uma condição e não informou a variável/valor em uma comparação.; ou <br/>3) Você não incluiu o sinal de comparação (>, <, >=, <=, == ou !=) na condição. ou <br/> 4) Você escreveu uma condição, repetição ou função e não incluiu os : (dois pontos). <br/> 5) Você escreveu uma função ou a chamada à uma função e não colocou o parêntesis de abertura e/ou fechamento (). ou <br/> 6) Você escreveu uma String e não incluiu as aspas corretamente.</p>"
    return mensagem;
    
  }
}

/**
 * Analisa o algoritmo do estudante a procura de erros.
 */
export default class ParseAlgoritmo {

  
  nomesDeclarados

  constructor(public codigo) {
    
    this.nomesDeclarados = new Set();
  }  

  analisar(){

    let errosProgramacao = new ErrosExecucao(this.checkSyntax(), this.checkTypeErrors(), this.checkNameErrors(), this.checkIndentationErrors())
   

    return errosProgramacao;
  }

  private checkSyntax() {

    let errors = []; // Limpa os erros anteriores
    const keywords = [
      "def", "return", "if", "elif", "else", "while", "for", "try",
      "except", "finally", "class", "with", "break", "continue",
      "pass", "import", "from", "as", "raise", "global", "nonlocal",
      "assert", "del", "lambda"
    ];
    const stack = []; // Para verificar balanceamento de parênteses, colchetes e chaves

    this.codigo.forEach((line, index) => {
      const lineNumber = index + 1;

      // Verifica indentação
      if (/^\s+/.test(line) && !line.trim()) {
        errors.push({
          line: lineNumber,
          error: "Linha com espaços ou tabulações vazias."
        });
      }

      // Verifica balanceamento de parênteses, colchetes e chaves
      for (const char of line) {
        if ("({[".includes(char)) {
          stack.push(char);
        } else if (")}]".includes(char)) {
          const last = stack.pop();
          if (!this.isMatchingPair(last, char)) {
            errors.push({
              line: lineNumber,
              error: `Parêntese, colchete ou chave não balanceado: '${char}'`
            });
          }
        }
      }

      // Verifica palavras reservadas malformadas
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        if (line.match(regex) && !line.trim().endsWith(":") && ["def", "class", "if", "elif", "else", "for", "while", "try", "except", "finally"].includes(keyword)) {
          errors.push({
            line: lineNumber,
            error: `Esperado ':' após '${keyword}'`
          });
        }
      });

      // Verifica strings não fechadas
      if ((line.match(/"/g) || []).length % 2 !== 0 || (line.match(/'/g) || []).length % 2 !== 0) {
        errors.push({
          line: lineNumber,
          error: "String não fechada."
        });
      }
    });

    // Verifica se ao final há parênteses, colchetes ou chaves abertos
    if (stack.length > 0) {
      errors.push({
        line: this.codigo.length,
        error: "Parênteses, colchetes ou chaves não foram fechados."
      });
    }

    return errors;
  }

  isMatchingPair(open, close) {
    return (open === "(" && close === ")") ||
           (open === "[" && close === "]") ||
           (open === "{" && close === "}");
  }

  private checkNameErrors() {
    const errors = [];
    
    const namePattern = /\b([a-zA-Z_][a-zA-Z_0-9]*)\b/g;

    this.codigo.forEach((line, index) => {
      const lineNumber = index + 1;

      // Ignora linhas em branco ou com apenas comentários
      if (/^\s*(#|$)/.test(line)) {
        return;
      }

      // Verifica se há declarações de variáveis ou funções
      const assignmentPattern = /^\s*([a-zA-Z_][a-zA-Z_0-9]*)\s*=/;
      const matchAssignment = line.match(assignmentPattern);
      if (matchAssignment) {
        this.nomesDeclarados.add(matchAssignment[1]);
      }

      // Identifica nomes utilizados e verifica se foram declarados
      const matches = line.match(namePattern);
      if (matches) {
        matches.forEach(name => {
          if (
            !this.nomesDeclarados.has(name) && // Não foi declarado antes
            !this.isKeyword(name) && // Não é uma palavra-chave
            !this.isBuiltin(name) // Não é uma função embutida do Python
          ) {
            errors.push({
              line: lineNumber,
              error: `NameError: nome '${name}' não definido`
            });
          }
        });
      }
    });

    return errors;
  }

  isKeyword(name) {
    const keywords = [
      "def", "return", "if", "elif", "else", "while", "for", "try",
      "except", "finally", "class", "with", "break", "continue",
      "pass", "import", "from", "as", "raise", "global", "nonlocal",
      "assert", "del", "lambda"
    ];
    return keywords.includes(name);
  }

  isBuiltin(name) {
    const builtins = [
      "print", "len", "range", "int", "str", "list", "dict", "set",
      "tuple", "float", "bool", "abs", "sum", "min", "max", "open",
      "input", "type", "id", "enumerate", "zip", "map", "filter", "any",
      "all", "sorted"
    ];
    return builtins.includes(name);
  }

  checkTypeErrors() {
    const errors = [];
    const functionCallPattern = /\b([a-zA-Z_][a-zA-Z_0-9]*)\s*\(/;
    const indexAccessPattern = /\b([a-zA-Z_][a-zA-Z_0-9]*)\s*\[/;
    const operationPattern = /([a-zA-Z_][a-zA-Z_0-9]*|['"].*?['"]|\d+)\s*([\+\-\*\/%><=]=?|and|or|not|is|in)\s*([a-zA-Z_][a-zA-Z_0-9]*|['"].*?['"]|\d+)/;
  
    this.codigo.forEach((line, index) => {
      const lineNumber = index + 1;
  
      // Verifica chamadas de funções em variáveis que não são declaradas como funções
      const funcCallMatch = line.match(functionCallPattern);
      if (funcCallMatch) {
        const funcName = funcCallMatch[1];
        if (!this.nomesDeclarados.has(funcName) && !this.isBuiltin(funcName)) {
          errors.push({
            line: lineNumber,
            error: `TypeError: '${funcName}' não é uma função`
          });
        }
      }
  
      // Verifica tentativas de indexação em tipos não indexáveis
      const indexAccessMatch = line.match(indexAccessPattern);
      if (indexAccessMatch) {
        const varName = indexAccessMatch[1];
        if (!this.nomesDeclarados.has(varName)) {
          errors.push({
            line: lineNumber,
            error: `TypeError: '${varName}' não suporta indexação`
          });
        }
      }
  
      // Verifica operações não suportadas entre tipos
      const operationMatch = line.match(operationPattern);
      if (operationMatch) {
        const leftOperand = operationMatch[1];
        const operator = operationMatch[2];
        const rightOperand = operationMatch[3];
  
        // Detecta combinações problemáticas de tipos (heurística)
        if (this.isIncompatibleOperation(leftOperand, rightOperand, operator)) {
          errors.push({
            line: lineNumber,
            error: `TypeError: Operação '${operator}' não suportada entre '${leftOperand}' e '${rightOperand}'`
          });
        }
      }
    });

    return errors;
  }
  
  isIncompatibleOperation(left, right, operator) {
    // Simula a detecção de tipos com base nos valores
    const isString = val => /^['"].*['"]$/.test(val);
    const isNumber = val => /^\d+(\.\d+)?$/.test(val);
  
    if ((isString(left) && isNumber(right)) || (isNumber(left) && isString(right))) {
      if (["+", "-", "*", "/", "%", "<", ">", "<=", ">=", "==", "!="].includes(operator)) {
        return true; // Strings e números são incompatíveis para essas operações
      }
    }
  
    if (isString(left) && isString(right)) {
      if (["-", "*", "/", "%", "<", ">", "<=", ">=", "==", "!="].includes(operator)) {
        return true; // Strings não suportam essas operações
      }
    }
  
    // Extensões para outras combinações podem ser adicionadas aqui
    return false;
  }
  
  checkIndentationErrors() {
    const errors = [];
    const indentationStack = []; // Para rastrear o nível esperado de indentação
  
    this.codigo.forEach((line, index) => {
      const lineNumber = index + 1;
  
      // Ignora linhas em branco ou com apenas comentários
      if (/^\s*(#|$)/.test(line)) {
        return;
      }
  
      // Calcula o nível de indentação da linha atual
      const currentIndentation = line.match(/^\s*/)[0].length;
  
      if (indentationStack.length === 0) {
        indentationStack.push(currentIndentation);
      } else {
        const previousIndentation = indentationStack[indentationStack.length - 1];
  
        if (currentIndentation > previousIndentation) {
          // Indentação aumenta de forma válida
          indentationStack.push(currentIndentation);
        } else if (currentIndentation < previousIndentation) {
          // Indentação diminui; valida se há correspondência
          while (indentationStack.length > 0 && currentIndentation < indentationStack[indentationStack.length - 1]) {
            indentationStack.pop();
          }
          if (currentIndentation !== (indentationStack[indentationStack.length - 1] || 0)) {
            errors.push({
              line: lineNumber,
              error: `Indentação inconsistente na linha ${lineNumber}.`
            });
          }
        }
      }
  
      // Verifica se a linha atual precisa de indentação (ex.: após ":" na linha anterior)
      if (index > 0) {
        const previousLine = this.codigo[index - 1].trim();
        if (previousLine.endsWith(":") && currentIndentation <= (indentationStack[indentationStack.length - 2] || 0)) {
          errors.push({
            line: lineNumber,
            error: `Indentação esperada após a linha ${lineNumber - 1}.`
          });
        }
      }
    });
  
    /* // Verifica se há blocos que não foram fechados corretamente
    if (indentationStack.length > 1) {
      errors.push({
        line: this.codigo.length,
        error: "Indentação inesperada ao final do código."
      });
    } */

    return errors;
  }
  

}

export class MensagemErroFactory{

  static construir(erro:ErroProgramacao){
      if( erro == null){
        return ;
      }
      let objeto: ErroProgramacao | null;
      switch(erro.categoria){
          case 'syntaxError':
              objeto = new SyntaxError(erro.linha, erro.mensagem, erro.categoria);
              break;
      }

      return objeto;
     
  }

  
}
