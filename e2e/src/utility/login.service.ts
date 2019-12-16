import { browser } from 'protractor';

export default class LoginServiceMock{
    
    static logar(grupo, id=12345){
        let usuario = '{"id":"'+id+'", "grupoExperimento":'+grupo+'}'
        let script = "return window.sessionStorage.setItem('usuario', '"+usuario+"');"
        browser.executeScript(script);
    }

    static logout(){
        browser.executeScript("return window.sessionStorage.removeItem('usuario');");
    }

}