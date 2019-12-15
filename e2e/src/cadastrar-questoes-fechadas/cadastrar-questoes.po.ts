import { browser, by, element } from 'protractor';

export class CadastroQuestaoFechadaPage {
  navigateTo() {
    return browser.get('/cadastro-questao-fechada/YbbcoDvdSKPXS9JXCRtM');
  }
  
  getInputTitulo() {
    return element(by.id('titulo'));
  }

  getTextAreaEnunciado(){
    return element(by.id('enunciado'));
  }

  getSpinnerSequencia(){
    return element(by.id('sequencia'));
  }

  getdropdownDificuldade(){
      return element(by.id('dificuldade'));
  }

  getButtonCriarAlternativa(){
    return element(by.id('alternativa'));
  }

  getButtonCadastrar(){
    return element(by.id('cadastrar'));
  }


}
