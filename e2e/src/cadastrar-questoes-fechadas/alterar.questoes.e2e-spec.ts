
import { browser, by, protractor } from 'protractor';
import Usuario from '../../../src/app/model/usuario';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { DocumentModule } from '../../../src/app/model/firestore/document.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from '../../../src/environments/firebase';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import DocumentFirestoreTest from '../model/document';
import { AlterarQuestaoFechadaPage } from './alterar-questoes.po';




browser.waitForAngularEnabled(false);

describe('Testes E2E de cadastro de questao fechada', () => {
  let page: AlterarQuestaoFechadaPage;
  let firestore: DocumentFirestoreTest;

  beforeAll(() => {

    page = new AlterarQuestaoFechadaPage();
    page.navigateTo();
    firestore = new DocumentFirestoreTest(FirebaseConfiguracao);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;


  });

  beforeEach(() => {

  })

  it('deve verificar se há um h1 com o nome alterar questão', () => {
    expect(page.getInputTitulo().isPresent()).toBeTruthy();

  });

  it('deve verificar se há um input para o titulo da questao', () => {
    expect(page.getInputTitulo().isPresent()).toBeTruthy();

  });

  it('deve verificar se há um textArea para o enunciado da questao', () => {
    expect(page.getTextAreaEnunciado().isPresent()).toBeTruthy();
  });

  

  it('deve verificar se há um Spinner para a sequencia da questao', () => {
    expect(page.getSpinnerSequencia().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um dropdown para a diciculdade da questao', () => {
    expect(page.getdropdownDificuldade().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um botão para criar a alternativa', () => {
    expect(page.getButtonCriarAlternativa().isPresent()).toBeTruthy();
  });



  it('deve efetivar uma alteração da questao fechada', (done) => {
      page.getInputTitulo().sendKeys("12345");
      page.getTextAreaEnunciado().sendKeys('uma questao')
      page.getSpinnerSequencia().sendKeys(5);
      page.getdropdownDificuldade().sendKeys(1);
      page.getdropdownDificuldade();

      page.getButtonCriarAlternativa().click().then(resultado =>{
        expect(page.getComponenteAlternativa().isDisplayed());
        page.getTextAreaJustificativa().sendKeys("alternativa alterada");
        page.getButtonCadastrar().click().then(resultado => {
  
          setTimeout(function(){
            expect(page.getTextAreaJustificativa).toEqual("alternativa alterada");
  
          }, 2000);
          
        });

      });

      
  });


  

});
