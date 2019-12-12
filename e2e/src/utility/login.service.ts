import { browser } from 'protractor';

export default class LoginServiceMock{
    
    static logar(){
        let usuario = '{"id":"12345", "grupoExperimento":1}'
        let script = "return window.sessionStorage.setItem('usuario', '"+usuario+"');"
        browser.executeScript(script);
    }

    static logout(){
        browser.executeScript("return window.sessionStorage.removeItem('usuario');");
    }

}