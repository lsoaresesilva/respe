import { CadastroEstudantePage } from './cadastro-estudante.po';
import { browser, by, protractor } from 'protractor';
import Usuario from '../../../src/app/model/usuario';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../../../src/app/model/firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from '../../../src/environments/firebase';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import DocumentFirestoreTest from '../model/document';

browser.waitForAngularEnabled(false);

describe('Testes E2E de cadastro de estudante', () => {
  let page: CadastroEstudantePage;
  let firestore: DocumentFirestoreTest;

  beforeAll(() => {

    page = new CadastroEstudantePage();
    page.navigateTo();
    firestore = new DocumentFirestoreTest(FirebaseConfiguracao);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;


  });

  beforeEach(() => {

  })

  it('deve verificar se há um input para o código da turma', () => {
    expect(page.getInputCodigoTurma().isPresent()).toBeTruthy();

  });

  it('deve verificar se há um input para o nome do estudante', () => {

    expect(page.getInputNome().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um input para o senha do estudante', () => {

    expect(page.getInputSenha().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um input para o email do estudante', () => {

    expect(page.getInputEmailEstudante().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um botão de cadasro do estudante', () => {

    expect(page.getButtonCadastrar().isPresent()).toBeTruthy();
  });

  it('deve efetivar um cadastro de estudante', (done) => {
    let contador;
    firestore.count("usuarios").subscribe(contagemAnterior => {
      page.getInputCodigoTurma().sendKeys("12345");
      page.getInputEmailEstudante().sendKeys("teste@e2e.com");
      page.getInputNome().sendKeys("Teste com o Protractor");
      page.getInputSenha().sendKeys("12345");
      page.getButtonCadastrar().click().then(resultado => {

        setTimeout(function () {
          firestore.count("usuarios").subscribe(contadorAtual => {
            expect(contagemAnterior).toBeLessThan(Number.parseInt("" + contadorAtual));
            expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/");
            firestore.deleteLatest("usuarios").subscribe(res => {
              done();
            })

          })
        }, 5000)


      });
    })


    //expect(page.getButtonCadastrar().isPresent()).toBeTruthy();
  });

  it("Deve apresentar uma mensagem de erro ao não informar os inputs obrigatórios", () => {
    page.navigateTo();
    page.getInputCodigoTurma().sendKeys("12345");
    page.getButtonCadastrar().click().then(resultado => {
      let EC = protractor.ExpectedConditions;
      expect(EC.alertIsPresent()).toBeTruthy();
    });
  })

  it("Deve apresentar uma mensagem de erro quando não houver uma turma cadastrada com o código informado", () => {
    page.navigateTo();
    page.getInputCodigoTurma().sendKeys("abc");
    page.getButtonCadastrar().click().then(resultado => {
      let EC = protractor.ExpectedConditions;
      expect(EC.alertIsPresent()).toBeTruthy();
    });
  })

  it("Deve apresentar uma mensagem de erro quando tentar cadastrar e já houver um usuário cadastrado", (done) => {
    page.navigateTo();
    page.getInputCodigoTurma().sendKeys("12345");
    page.getInputEmailEstudante().sendKeys("teste@e2e.com");
    page.getInputNome().sendKeys("Teste com o Protractor");
    page.getInputSenha().sendKeys("12345");
    page.getButtonCadastrar().click().then(resultado => {

      setTimeout(function () {
          page.navigateTo();
          page.getInputCodigoTurma().sendKeys("12345");
          page.getInputEmailEstudante().sendKeys("teste@e2e.com");
          page.getInputNome().sendKeys("Teste com o Protractor");
          page.getInputSenha().sendKeys("12345");
          page.getButtonCadastrar().click().then(resultado => {
            let EC = protractor.ExpectedConditions;
            expect(EC.alertIsPresent()).toBeTruthy();
            firestore.deleteLatest("usuarios").subscribe(res => {
              done();
            })
          });

          
          

      }, 5000)


    });
  })

});
