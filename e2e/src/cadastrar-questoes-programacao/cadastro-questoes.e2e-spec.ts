
import { browser, by, protractor } from 'protractor';
import Usuario from '../../../src/app/model/usuario';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../../../src/app/model/firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from '../../../src/environments/firebase';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import DocumentFirestoreTest from '../model/document';
import { CadastroQuestaoPage } from './cadastro.questoes.po';

browser.waitForAngularEnabled(false);

describe('Testes E2E de cadastro de questao', () => {
  let page: CadastroQuestaoPage;
  let firestore: DocumentFirestoreTest;

  beforeAll(() => {

    page = new CadastroQuestaoPage();
    page.navigateTo();
    firestore = new DocumentFirestoreTest(FirebaseConfiguracao);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;


  });

  beforeEach(() => {

  })

  it('deve verificar se há um input para o titulo da questao', () => {
    expect(page.getInputTitulo().isPresent()).toBeTruthy();

  });

  it('deve verificar se há um textArea para o enunciado da questao', () => {
    expect(page.getTextAreaEnunciado().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um checkbox para os assuntos da questao', () => {
    expect(page.getCheckboxAssuntos().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um Spinner para a sequencia da questao', () => {
    expect(page.getSpinnerSequencia().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um dropdown para a diciculdade da questao', () => {
    expect(page.getdropdownDificuldade().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um buttão para criar um testCase', () => {
    expect(page.getdropdownDificuldade().isPresent()).toBeTruthy();
  });


  it('deve efetivar um cadastro de questao', (done) => {
    let contador;
    firestore.count("questoes").subscribe(contagemAnterior => {
      page.getInputTitulo().sendKeys("12345");
      page.getTextAreaEnunciado().sendKeys('uma questao');
      page.getCheckboxAssuntos().sendKeys('3qPa6szPKoXs0CI9aQHS');
      page.getSpinnerSequencia().sendKeys(5);
      page.getdropdownDificuldade().sendKeys(1);

      page.getButtonCriarTesteCase().click().then

      
      page.getButtonCadastrar().click().then(resultado => {

        setTimeout(function () {
          firestore.count("questoes").subscribe(contadorAtual => {
            expect(contagemAnterior).toBeLessThan(Number.parseInt("" + contadorAtual));
            expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/main/(principal:visualizacao-assunto/3qPa6szPKoXs0CI9aQHS)");
            firestore.deleteLatest("questoes").subscribe(res => {
              done();
            })

          })
        }, 5000)


      });
    })


    //expect(page.getButtonCadastrar().isPresent()).toBeTruthy();
  });

  it("Deve apresentar uma mensagem de erro ao não informar os campos obrigatórios", () => {
    page.navigateTo();
    page.getInputTitulo().sendKeys("12345");
    page.getButtonCadastrar().click().then(resultado => {
      let EC = protractor.ExpectedConditions;
      expect(EC.alertIsPresent()).toBeTruthy();
    });
  })



});
