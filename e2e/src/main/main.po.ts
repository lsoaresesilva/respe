import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class MainPage {
  
  navigateToGrupoControle() {
    let loginPage = new LoginPage();
    console.log("login")
    return loginPage.realizarLoginGrupoControle();
  }

  navigateToGrupoExperimental() {
    let loginPage = new LoginPage();
    console.log("login")
    return loginPage.realizarLoginGrupoExperimental();
  }

  getMenuAssuntos() {
    return element(by.id('assuntosMenu'));
  }

  getMenuSair() {
    return element(by.id('sairMenu'));
  }

  getMenuPlanejamento() {
    return element(by.id('planejamentoMenu'));
  }

  getMenuDesempenho() {
    return element(by.id('meuDesempenhoMenu'));
  }

  
}
