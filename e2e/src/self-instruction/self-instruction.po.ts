import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class SelfInstructionPage {

  navigateTo(){
    return browser.get("/main/(principal:self-instruction/PU0EstYupXgDZ2a57X0X/c4e98001-f1fb-4de3-979e-55718edb92d2)");
  }
  

  getResponderBtn(){
    return element(by.id("responderBtn"));
  }

  getQuestaoEnunciado(){
    return element(by.id("enunciado"));
  }

  getSelfInstructions(){
    return element(by.id("self-instructions"));
  }

  getProblemaAccordion(){
    return element(by.id("problema"));
  }
  
  getVariaveisAccordion(){
    return element(by.id("variaveis"));
  }

  getCondicoesAccordion(){
    return element(by.id("condições"));
  }
}
