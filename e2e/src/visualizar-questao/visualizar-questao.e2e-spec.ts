import { VisualizarQuestaoPage } from './visualizar-questao.po';
import { browser, by } from 'protractor';
import { SelfInstructionPage } from '../self-instruction/self-instruction.po';
import { LoginPage } from '../login/login.po';

describe('workspace-project App', () => {
  let page: VisualizarQuestaoPage;

  beforeAll(() => {
    page = new VisualizarQuestaoPage();

  });

  it('deve verificar se há um botão para responder questão', (done) => {
    page.navigateTo().then(() => {
      expect(page.getResponderBtn().isDisplayed()).toBeTruthy();
      done();
    })

  });

  /*it("deve redirecionar para self-instruction se o usuário logado for do grupo experimental", (done)=>{
    //browser.executeScript("return window.sessionStorage.setItem('usuario', '{grupoExperimento:1}');");
    let loginPage = new LoginPage();
    loginPage.realizarLoginGrupoExperimental().then(()=>{
      page.navigateTo().then(()=>{
        browser.driver.sleep(5000);
        page.getResponderBtn().click().then(()=>{
          browser.driver.sleep(5000);
          expect(browser.getCurrentUrl()).toContain("self-instruction");
          let selfInstructionPage = new SelfInstructionPage();
          expect(selfInstructionPage.getSelfInstructions().isDisplayed()).toBeTruthy();
          done();
        })
      })
    });
    
  })*/

  /*it("deve redirecionar para self-instruction se o usuário logado for do grupo controle", (done) => {
    console.log("self")
    let loginPage = new LoginPage();
    loginPage.realizarLoginGrupoControle().then(() => {
      page.navigateTo().then(() => {
        browser.driver.executeScript('sessionStorage.getItem("usuario");').then(function (retValue) {
          console.log(retValue);
          browser.driver.sleep(10000);
          page.getResponderBtn().click().then(() => {
            browser.driver.sleep(5000);
            expect(browser.getCurrentUrl()).toContain("editor");
            let selfInstructionPage = new SelfInstructionPage();
            expect(selfInstructionPage.getSelfInstructions().isDisplayed()).toBeFalsy();
            done();
          })
        });

      })
    })

  })*/



});
