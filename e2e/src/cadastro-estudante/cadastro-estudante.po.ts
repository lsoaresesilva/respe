import { browser, by, element } from 'protractor';

export class CadastroEstudantePage {
  navigateTo() {
    return browser.get('/cadastro-estudante');
  }

  getInputCodigoTurma() {
    return element(by.id('codigo-turma'));
  }

  getInputNome(){
    return element(by.id('nome'));
  }

  getInputEmailEstudante(){
    return element(by.id('email'));
  }

  getInputSenha(){
    return element(by.id('senha'));
  }

  getButtonCadastrar(){
    return element(by.id('cadastrar'));
  }
}
