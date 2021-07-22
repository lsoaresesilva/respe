import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { TestBed, inject } from '@angular/core/testing';

import { DocumentModule } from '../firestore/document.module';

import { AngularFireModule, FirebaseApp } from '@angular/fire';

import { FirebaseConfiguracao } from 'src/environments/firebase';

import { Assunto } from '../sistema-aprendizagem/assunto';

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

  /*it("Deve calcular o percentual de questões fechadas que foram resolvidas", (done)=>{
        let a = new Assunto(null, "Condições");
        let qf1 = new QuestaoFechada(null, "bla", "", Dificuldade.dificil, 1, [new Alternativa(123, "texto", true)], "");
        let qf2 = new QuestaoFechada(678910, "ble", "", Dificuldade.dificil, 1, null, "");
        a.questoesFechadas.push(qf1);
        a.questoesFechadas.push(qf2);
        let u = new Usuario(null, "leo@leo.com", "", PerfilUsuario.estudante,null);
        let rqf1 = new RespostaQuestaoFechada(null, u, new Alternativa(123, "", true), qf1);
        forkJoin([a.save(), u.save()]).subscribe(resultado=>{
            rqf1.save().subscribe(res=>{
                Assunto.calcularPercentualConclusaoQuestoesFechadas(a, u).subscribe(calculo=>{
                    expect(calculo).toBe(0.5);
                    forkJoin([Assunto.delete(a.pk()), Usuario.delete(u.pk()), RespostaQuestaoFechada.delete(rqf1.pk())]).subscribe(res=>{
                        done();
                    })
                });
            })
        })

    });

    it("Deve calcular o percentual de conclusão de uma questão de programação.", (done)=>{
        let a = new Assunto(null, "Condições");
        let u = new Usuario(null, "leo@leo.com", "", PerfilUsuario.estudante, 0);
        let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

        let t = new TestCase(null, ["a", "b"], "c")
        let t1 = new TestCase(null, ["d", "e"], "a")
        let testsCases = [t, t1]

        q.testsCases = testsCases;

        a.questoesProgramacao.push(q);

        let rt = new ResultadoTestCase(null, true, "t", t)
        let rt2 = new ResultadoTestCase(null, true, "t1",t1);
        let s = new Submissao(null, new Codigo(), u, q);
        s.resultadosTestsCases.push(rt);
        s.resultadosTestsCases.push(rt2);

        forkJoin([a.save(), u.save()]).subscribe(resultado=>{
            s.save().subscribe(res=>{

                Assunto.calcularPercentualConclusaoQuestoesProgramacao(a, u, 0.6).subscribe(calculo=>{
                    expect(calculo).toBe(1);
                    forkJoin([Assunto.delete(a.pk()), Usuario.delete(u.pk()), Submissao.delete(s.pk())]).subscribe(res=>{
                        done();
                    })
                });
            })
        })

    });

    it("Deve calcular o percentual de conclusão de um assunto.", (done)=>{
        let a = new Assunto(null, "Condições");
        let qf1 = new QuestaoFechada(null, "bla", "", Dificuldade.dificil, 1, [new Alternativa(123, "texto", true)], "");
        let qf2 = new QuestaoFechada(678910, "ble", "", Dificuldade.dificil, 1, null, "");
        a.questoesFechadas.push(qf1);
        a.questoesFechadas.push(qf2);
        let u = new Usuario(null, "leo@leo.com", "", PerfilUsuario.estudante, 0);
        let rqf1 = new RespostaQuestaoFechada(null, u, new Alternativa(123, "", true), qf1);


        let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

        let t = new TestCase(null, ["a", "b"], "c")
        let t1 = new TestCase(null, ["d", "e"], "a")
        let testsCases = [t, t1]

        q.testsCases = testsCases;

        a.questoesProgramacao.push(q);

        let rt = new ResultadoTestCase(null, true, "t", t)
        let rt2 = new ResultadoTestCase(null, true, "t1",t1);
        let s = new Submissao(null, new Codigo(), u, q);
        s.resultadosTestsCases.push(rt);
        s.resultadosTestsCases.push(rt2);

        forkJoin([a.save(), u.save()]).subscribe(resultado=>{
            forkJoin([rqf1.save(), s.save()]).subscribe(res=>{

                a.calcularPercentualConclusao(u).subscribe(calculo=>{
                    expect(calculo).toBe(0.75);
                    forkJoin([Assunto.delete(a.pk()), Usuario.delete(u.pk()), RespostaQuestaoFechada.delete(rqf1.pk())]).subscribe(res=>{
                        done();
                    })
                });
            })
        })

    });*/

  it('Deve ordenar um array de assuntos seguindo a ordem estabelecida na disciplina', () => {
    let a = new Assunto(null, 'assuntoA');
    a.sequencia = 1;
    let b = new Assunto(null, 'assuntoB');
    b.sequencia = 2;
    let c = new Assunto(null, 'assuntoC');
    c.sequencia = 3;

    let arrayAssuntos = [c, b, a];

    arrayAssuntos = Assunto.ordenar(arrayAssuntos);
    expect(arrayAssuntos[0].nome).toEqual('assuntoA');
    expect(arrayAssuntos[1].nome).toEqual('assuntoB');
    expect(arrayAssuntos[2].nome).toEqual('assuntoC');
  });

  /*
    it("deve resultar em true para uma questão que teve todos os tests cases respondidos", (done) => {
        let a = new Assunto(null, "umAssunto");
        a.save().subscribe(resultado => {
            let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

            let t = new TestCase(null, ["a", "b"], "c", q)
            let t1 = new TestCase(null, ["d", "e"], "a", q)
            let testsCases = [t, t1]

            q.testsCases = testsCases;
            q.save().subscribe(resultado => {
                let rt = new ResultadoTestCase(null, true, t, new Estudante("123", "oi", null)).save();
                let rt2 = new ResultadoTestCase(null, true, t1, new Estudante("123", "oi", null)).save();
                Usuario.getUsuarioLogado = () =>{
                    return new Usuario("123", "oi", "", null);
                }
                forkJoin([rt, rt2]).subscribe(resultadoSalvarTestCases => {
                    Assunto.isFinalizado(a, new Estudante("123", "oi", null)).subscribe(resultado => {
                        expect(resultado).toBeTruthy();
                        Assunto.delete(a.pk())
                        Questao.delete(q.pk()).subscribe(r => {
                            TestCase.deleteAll().subscribe(r => {
                                ResultadoTestCase.deleteAll().subscribe(r => {
                                    done();
                                })
                            })
                        })
                    })

                })
            })
        })


    })

    it("deve resultar em false para uma questão que teve todos os tests cases respondidos", (done) => {
        let a = new Assunto(null, "umAssunto", null, null, null);
        a.save().subscribe(resultado => {
            let q = new Questao(null, "nome", "enunciado", Dificuldade.facil, 1, a, [a], []);

            let t = new TestCase(null, ["a", "b"], "c", q)
            let t1 = new TestCase(null, ["d", "e"], "a", q)
            let testsCases = [t, t1]

            q.testsCases = testsCases;
            q.save().subscribe(resultado => {
                let rt = new ResultadoTestCase(null, true, t, new Estudante("123", "oi", null)).save();
                let rt2 = new ResultadoTestCase(null, false, t, new Estudante("123", "oi", null)).save();
                let rt3 = new ResultadoTestCase(null, true, t1, new Estudante("123", "oi", null)).save();

                Usuario.getUsuarioLogado = () =>{
                    return new Usuario("123", "oi", "", null);
                }

                forkJoin([rt, rt2, rt3]).subscribe(resultadoSalvarTestCases => {
                    Assunto.isFinalizado(a, new Estudante("123", "oi", null)).subscribe(resultado => {
                        expect(resultado).toBeFalsy();
                        Assunto.delete(a.pk())
                        Questao.delete(q.pk()).subscribe(r => {
                            TestCase.deleteAll().subscribe(r => {
                                ResultadoTestCase.deleteAll().subscribe(r => {
                                    done();
                                })
                            })
                        })
                    })
                })



            })


        })
    })*/
});
