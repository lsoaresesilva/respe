import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class VisualizarQuestaoPage {

  navigateTo(){
    return browser.get("/main/(principal:visualizacao-questao/PU0EstYupXgDZ2a57X0X/c4e98001-f1fb-4de3-979e-55718edb92d2)");
  }
  

  getResponderBtn(){
    return element(by.id("responderBtn"));
  }

  

  
}
