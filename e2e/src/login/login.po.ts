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

  getButtonLogin(){
    return element(by.id("loginBtn"));
  }

  realizarLoginGrupoControle(){
    this.navigateTo();
    this.getInputLogin().sendKeys("lets@controle.com");
    this.getInputSenha().sendKeys("12345");
    return this.getButtonLogin().click();
  }

  realizarLoginGrupoExperimental(){
    this.navigateTo();
    this.getInputLogin().sendKeys("lets@experimental.com");
    this.getInputSenha().sendKeys("12345");
    return this.getButtonLogin().click();
  }
}
