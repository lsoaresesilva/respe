import { browser, by, element } from 'protractor';

export class AlterarQuestaoPage {
  navigateTo() {
    return browser.get('/cadastro-questao/3qPa6szPKoXs0CI9aQHS');
  }

  getInputTitulo() {
    return element(by.id('titulo'));
  }

  getTextAreaEnunciado(){
    return element(by.id('enunciado'));
    
  }

  getCheckboxAssuntos(){
    return element(by.id('assuntos'));
  }

  getSpinnerSequencia(){
    return element(by.id('sequencia'));
  }

  getdropdownDificuldade(){
      return element(by.id('dificuldade'));
  }

  getButtonCriarTesteCase(){
    return element(by.id('criarTestCase'));
  }

  getButtonCadastrar(){
    return element(by.id('cadastrar'));
  }


}
