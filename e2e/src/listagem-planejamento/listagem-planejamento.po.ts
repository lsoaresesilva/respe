import { browser, by, element } from 'protractor';

export class ListagemPlanejamentoPage {
  
  navigateTo() {
    return browser.get('/main/(principal:listagem-planejamento)');
  }

  getPlanejamentoDialog(){
    return element(by.id("planejamentoDialog"));
  }

  getPlanejamentoLinhaTabela(index){
    return element(by.id("planejamento"+index));
  }

  
}
