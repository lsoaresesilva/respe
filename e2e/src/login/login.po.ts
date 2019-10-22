import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getInputLogin() {
    return element(by.id('login'));
  }

  getInputSenha(){
    return element(by.id("senha"));
  }

  getButtonCadastro(){
    return element(by.id("cadastro"));
  }
}
