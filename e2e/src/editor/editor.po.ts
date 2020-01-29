import { browser, by, element, ElementFinder, Key } from 'protractor';
import { LoginPage } from '../login/login.po';

export class EditorPage {

  loginPage = new LoginPage();
  
  navigateTo(assunto, questao) {
    return browser.get('/main/(principal:editor/'+assunto+"/"+questao);
  }

  getInputLogin() {
    return element(by.id('login'));
  }

  getBotaoExecutar(){
    return element(by.id('btnExecutar'));
  }


  getStatusExecucao(){
    return element(by.id("statusExecucaoAlgoritmo"));
  }


  /*realizarLoginGrupoControle(){
    this.navigateTo();
    this.getInputLogin().sendKeys("lets@controle.com");
    this.getInputSenha().sendKeys("12345");
    return this.getButtonLogin().click();
  }*/

  realizarQuestaoVariaveis(){
    this.loginPage.realizarLoginGrupoExperimental().then(resultado=>{
      
    })
  }


  getEditorProgramacao(){
    return element(by.tagName("textarea"));
  }

  clear() {
    browser.executeScript("editor.setValue('')");
  }
}
