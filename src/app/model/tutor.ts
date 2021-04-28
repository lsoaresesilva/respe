import Estudante from './errors/analise-pre-compilacao/erroSintaxeFuncao';
import Erro from './errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Submissao from './submissao';
import { Assunto } from './assunto';
import Usuario from './usuario';

export class Tutor {
  constructor(private submissao: Submissao) {}

  static mediaTestsCases(estudante: Estudante) {
    return new Observable((observer) => {
      // pegar todos os testes cases respondidos pelo estudante
      // TODO: resolver.
      /*ResultadoTestCase.getAll(new Query("estudanteId", "==", "12345")).subscribe(respostas=>{
                let respostasTestsCases = respostas.length;
                let respostasCorretas = 0;
                respostas.forEach(resultado=>{
                    if( resultado.status )
                        respostasCorretas += 1;

                });

                let percentual = respostasCorretas/respostasTestsCases;
                observer.next(percentual);
                observer.complete();

            }, err=>{
                // TODO: fazer algo com o erro
            });*/
    });
  }

  /* static getDesempenhoEstudante(estudante: Usuario) {
    return new Observable((observer) => {
      Assunto.getAll().subscribe(
        (assuntos) => {
          let percentuaisQuestoesRespondidasPorAssunto = {};
          if (Array.isArray(assuntos) && assuntos.length > 0) {
            assuntos.forEach((assunto) => {
              percentuaisQuestoesRespondidasPorAssunto[
                assunto.nome
              ] = Assunto.calcularPercentualConclusaoQuestoesProgramacao(assunto, estudante, 0.6);
            });

            if (Object.keys(percentuaisQuestoesRespondidasPorAssunto).length > 0) {
              forkJoin(percentuaisQuestoesRespondidasPorAssunto).subscribe((percentuais) => {
                observer.next(percentuais);
                observer.complete();
              });
            }
          } else {
            observer.next([]);
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  } */
}
