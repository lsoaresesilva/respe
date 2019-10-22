import { LoginPage } from './login.po';
import { browser, by } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  /*beforeAll(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('deve verificar se há um input para o login', () => {
    
    expect(page.getInputLogin().isPresent()).toBeTruthy();
  });

  it('deve verificar se há um input para a senha', () => {
    
    expect(page.getInputSenha().isPresent()).toBeTruthy();
  });

  it("deve verificar se há um button para cadastrar estudante", ()=>{
    expect(page.getButtonCadastro().isPresent()).toBeTruthy();
  })

  it("deve redirecionar para a página de cadastro", ()=>{
    page.getButtonCadastro().click();
    expect(browser.driver.getCurrentUrl()).toContain('/cadastro-estudante');
    expect(browser.driver.findElement(by.id("codigo-turma")).isDisplayed()).toBeTruthy();
  })*/
});
