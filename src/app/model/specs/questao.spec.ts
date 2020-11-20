import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../firestore/document.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Dificuldade } from '../enums/dificuldade';
import { Assunto } from '../assunto';
import Query from '../firestore/query';
import TestCase from '../testCase';
import { forkJoin } from 'rxjs';
import Submissao from '../submissao';
import Usuario from '../usuario';
import ResultadoTestCase from '../resultadoTestCase';
import { Assuntos } from '../enums/assuntos';

describe('Testes de questão', () => {
  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, //.enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  it('deve validar false para uma questão inválida', () => {
    let q = new QuestaoProgramacao(null, null, null, null, null, null, null, null);
    expect(q.validar()).toBeFalsy();
    q = new QuestaoProgramacao(null, null, null, null, null, null, [], null);
    expect(q.validar()).toBeFalsy();
  });

  it('deve validar true para uma questão válida', () => {
    let q = new QuestaoProgramacao(
      null,
      'algo',
      'enunciado',
      Dificuldade.facil,
      1,
      [new Assunto(null, null)],
      [new TestCase(123, [2], 3)],
      null
    );
    expect(q.validar()).toBeTruthy();
  });

  it('deve salvar uma questão corretamente', (done) => {
    let a = new Assunto(null, 'umAssunto');
    a.save().subscribe((resultado) => {
      let q = new QuestaoProgramacao(
        null,
        'nome',
        'enunciado',
        Dificuldade.facil,
        1,
        [a],
        [],
        null
      );

      let t = new TestCase(null, ['a', 'b'], 'c');
      let t1 = new TestCase(null, ['d', 'e'], 'a');
      let testsCases = [t, t1];

      q.testsCases = testsCases;

      a.questoesProgramacao = [];
      a.questoesProgramacao.push(q);
      a.save().subscribe((assuntoAtualizado) => {
        Assunto.get(a.pk()).subscribe((assunto) => {
          expect(a.questoesProgramacao.length).toBe(1);
          Assunto.delete(a.pk()).subscribe((deletou) => {
            done();
          });
        });
      });
    });
  });

  it('Deve indicar que a questão foi concluída pelo estudante', (done) => {
    let u = new Usuario('12345', null, null, null, 0);

    let a = new Assunto(null, 'umAssunto');
    let q = new QuestaoProgramacao(
      '54321',
      'nome',
      'enunciado',
      Dificuldade.facil,
      1,
      [a],
      [],
      null
    );
    let t = new TestCase(null, ['a', 'b'], 'c');
    let t1 = new TestCase(null, ['d', 'e'], 'a');
    let testsCases = [t, t1];

    q.testsCases = testsCases;

    a.questoesProgramacao = [];
    a.questoesProgramacao.push(q);

    let s = new Submissao(null, 'bla', u, q);
    s.resultadosTestsCases = [];
    s.resultadosTestsCases.push(new ResultadoTestCase(null, true, 'c', t));
    s.resultadosTestsCases.push(new ResultadoTestCase(null, true, 'a', t1));
    s.save().subscribe((res) => {
      QuestaoProgramacao.isFinalizada(q, u).subscribe((resultado) => {
        expect(resultado).toBeTruthy();
        Submissao.delete(s.pk()).subscribe((res) => {
          done();
        });
      });
    });
  });

  it('Deve recuperar os assuntos vinculados à uma questão', (done) => {
    // Cria dois assuntos
    let acondicoes = new Assunto(null, 'Condições');
    let afuncoes = new Assunto(null, 'Funções');

    // Salva o assunto no BD
    afuncoes.save().subscribe((assuntoSalvo) => {
      // Cria nossa questão que usaremos como base para nosso teste
      let qCondicao = new QuestaoProgramacao(
        null,
        'Questão com condição',
        null,
        Dificuldade.dificil,
        1,
        [afuncoes.pk()],
        [],
        ''
      );

      // Inclui a questão criada ao array de questões de programação do assunto de condições
      acondicoes.questoesProgramacao.push(qCondicao);

      // Executa o método que queremos testar
      /* qCondicao.buscarAssuntos(acondicoes).subscribe(
        (assuntos) => {
          // SE o método estiver correto, ele trará dois assuntos: funções e condições.
          // Usamos as variáveis abaixo para percorrer o array de assuntos (resposta do método buscarAssuntos) para verificar se há os assuntos
          let contemAssuntoFuncoes = false;
          let contemAssuntoCondicoes = false;

          assuntos.forEach((assunto) => {
            if (assunto.nome == Assuntos.condicoes) contemAssuntoCondicoes = true;

            if (assunto.nome == Assuntos.condicoes) contemAssuntoFuncoes = true;
          });

          // Faz as verificações se as variáveis são TRUE (ou seja, possui os assuntos funções e condições)
          expect(contemAssuntoCondicoes).toBeTruthy();
          expect(contemAssuntoFuncoes).toBeTruthy();
          // Deve chamar o método done em todas os testes que envolverem funções assíncronas (neste caso em buscar assunto)
          done();
        },
        (err) => {
          fail(); // Se o método assíncrono falhar, então indicar que o teste deu erro.
        }
      ); */
    });
  });
  /*
    it("deve carregar assuntosQuestao pelo id de questao", (done) => {

      let a = new Assunto(null, "umAssunto", null, null, null);
      a.save().subscribe(resultado => {
        let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

        let t = new TestCase(null, ["a", "b"], "c", q)
        let t1 = new TestCase(null, ["d", "e"], "a", q)
        let testsCases = [t, t1]

        q.testsCases = testsCases;
        q.save().subscribe(resultado => {

          TestCase.get(t.pk()).subscribe(testCase => {

            Questao.get(q.pk()).subscribe(resultadoQuestao => {
              expect(resultadoQuestao["assuntoPrincipal"]).toBeDefined();
              expect(resultadoQuestao["assuntoPrincipal"]["nome"]).toEqual("umAssunto");
              expect(resultadoQuestao["assuntos"].length).toBe(1);
              expect(resultadoQuestao["assuntos"][0]["nome"]).toEqual("umAssunto");
              expect(resultadoQuestao["testsCases"].length).toBe(2);
              expect(resultadoQuestao["testsCases"][0]["saida"]).toEqual("a");
              Questao.delete(q.pk()).subscribe(resultado => {
                forkJoin([TestCase.delete(t.pk()), TestCase.delete(t1.pk())]).subscribe(deleteTestCase => {
                  Assunto.delete(a.pk()).subscribe(deleteAssunto => {
                    done();
                  })

                })

              })
            })




          })


        })


      })
    });



    /*
    it("deve carregar Assunto pelo id de questao", (done) => {
      Assunto.getAll().subscribe(resultado => {
        expect(resultado.length).toBe(2);
        Assunto.get("dFfoRKSwBjEN1aJWVkgr").subscribe(assunto => {
          expect(assunto["nome"]).toBe("Condições")
          done();
        }, err => {
          fail();
          done();
        })
      })

    })

    it("deve carregar uma questão com seus assuntos", (done) => {
      Questao.getAll().subscribe(questoes => {
        expect(questoes.length).toBeGreaterThan(0);
        expect(questoes[0].id).toBe("LwC2ItAVtfkDhcE9jvpT");
        expect(questoes[0].assuntoPrincipal.id).toBe("pVH6LewMxIKM73ep2n1N");
        expect(questoes[0].assuntos.length).toBe(2);
        done();
      }, err => {
        fail();
        done();
      })
    });*/
});
