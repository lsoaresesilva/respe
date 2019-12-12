import { MainPage } from './main.po';
import { browser, by } from 'protractor';

describe('Testes na página Main', () => {
  let page: MainPage;

  browser.ignoreSynchronization = true; // Necessário, pois neste teste é feito um redirect por meio do router do Angular. sem isso o protractor não consegue funcionar


  beforeAll(() => {
    page = new MainPage();

  });

  it('deve verificar se há a opção de cadastro e sair para o grupo controle', (done) => {

    page.navigateToGrupoControle().then(r => {

      setTimeout(function () {
        browser.refresh();
        expect(page.getMenuAssuntos().isDisplayed()).toBeTruthy();
        expect(page.getMenuPlanejamento().isPresent()).toBeFalsy();
        page.getMenuSair().click().then(()=>{
          browser.refresh();
          done();
        })
        
      }, 2000)

    })

  });

  it('deve verificar se há as opções para o grupo experimental', (done) => {
    page.navigateToGrupoExperimental().then(r => {
      setTimeout(function () {
        browser.refresh();
        expect(page.getMenuAssuntos().isPresent()).toBeFalsy();
        expect(page.getMenuPlanejamento().isPresent()).toBeTruthy();
        expect(page.getMenuDesempenho().isPresent()).toBeTruthy();
        page.getMenuSair().click().then(()=>{
          browser.refresh();
          done();
        })
      }, 3000)

    })

  });


});
