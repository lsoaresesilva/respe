import { Observable } from 'rxjs';
import Submissao from '../submissao';

import submissoesEstudantes from '../../../../json/submissoes_29_mai.json';
import ErroCompilacaoFactory from '../errors/analise-compilacao/erroCompilacaoFactory';
import NameError from '../errors/analise-compilacao/nameError';
import ErroSintaxeVariavel from '../errors/analise-pre-compilacao/erroSintaxeVariavel';

export default class Export {
  static submissoes() {
    return new Observable((observer) => {
      Submissao.exportToJson().subscribe((submissoes) => {
        observer.next(submissoes);
        observer.complete();
      });
    });
  }

  static filtrarEstudantes(submissoesJson) {
    let submissoes = [];
    let excluidos = ['B3Xgj4IGEOQvjLKoTHI9', 'JJ8zNeRZBDr4qTElmYJk', 'xRSUKvyNAYV8Cmvn639q'];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (!excluidos.includes(s['estudante'])) {
        submissoes.push(s);
      }
    });

    return submissoes;
  }

  static calcularErrosVariaveis() {
    let errosSyntax = [];

    /*  let quantidade = submissoesEstudantes["submissoes"].length;
        console.log(quantidade); */

    let submissoes = Export.filtrarEstudantes(submissoesEstudantes);

    let estudantes = []

    submissoes.forEach((s) => {
      if (s['erro'] != null && s['erro']['traceback'] != null) {
        if(!estudantes.includes(s["estudante"])){
            estudantes.push(s["estudante"]);
        }
        let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
        if (categoria instanceof NameError || categoria instanceof SyntaxError) {
          let submissao: Submissao = new Submissao(null, s['codigo'], null, null, null);
          let erros = ErroSintaxeVariavel.erros(submissao.linhasAlgoritmo());
          if (erros.length != 0) {
            
            errosSyntax.push(erros);
          }
        }
      }
    });

    console.log("Total: "+estudantes.length);

    let resultado = ErroSintaxeVariavel.exportar(errosSyntax);
    return JSON.stringify(resultado);
  }
}
