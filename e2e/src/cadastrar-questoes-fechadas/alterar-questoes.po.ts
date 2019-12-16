import { browser, by, element } from 'protractor';

export class AlterarQuestaoFechadaPage {
  navigateTo() {
    return browser.get('/cadastro-questao-fechada/3qPa6szPKoXs0CI9aQHS/94abd943-356f-42ff-82f0-ac511b2bdfdd');
  }

  getH1TituloPagina(){
    return element(by.id('alterar'));
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

  getTextAreaJustificativa(){
    return element(by.id('alternativa'));
  }

  getComponenteAlternativa(){
    return element(by.id("cadastro-alternativa"));
  }

  getButtonCadastrar(){
    return element(by.id('cadastrar'));
  }


}
