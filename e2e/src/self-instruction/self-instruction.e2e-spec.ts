import { browser, protractor } from 'protractor';
import { SelfInstructionPage } from './self-instruction.po';
import { MainPage } from '../main/main.po';
import JasmineExpect from "jasmine-expect";
import LoginServiceMock from '../utility/login.service';
import { LoginService } from 'src/app/login-module/login.service';

describe('Testes na página Self-instruction', () => {
    let page: SelfInstructionPage;
    let mainPage: MainPage;

    browser.ignoreSynchronization = true; // Necessário, pois neste teste é feito um redirect por meio do router do Angular. sem isso o protractor não consegue funcionar

    beforeAll(() => {
        page = new SelfInstructionPage();
        mainPage = new MainPage();

    });

/*    it('deve garantir que usuários do grupo controle não irão acessar a página', (done) => {
        
        mainPage.navigateToGrupoControle().then(r => {

            setTimeout(function () {
                browser.refresh();
                let EC = protractor.ExpectedConditions;
                page.navigateTo().then(() => {
                    setTimeout(function () {
                        expect(EC.alertIsPresent()).toBeTruthy();
                        browser.switchTo().alert().accept();
                        setTimeout(function () {
                            browser.getCurrentUrl().then(url => {
                                expect(url.includes("main")).toBeTruthy();
                                
                                done();
                            })
                        }, 2000)
                    }, 2000)
                })
            }, 2000)
        })
    });

    it("Deve apresentar o enunciado da questão", (done)=>{
        
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    page.getQuestaoEnunciado().getText().then(text=>{
                        expect(text).not.toEqual("");
                        done();
                    })
                }, 2000)
                
                
            })
        })
        
    })

    it("Deve apresentar o acordion de problema", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getProblemaAccordion().isPresent()).toBeTruthy();
                    done();
                }, 2000)
                
                
            })
        })
    })

    it("Deve apresentar o acordion de variáves", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getVariaveisAccordion().isPresent()).toBeTruthy();
                    done();
                }, 2000)
                
                
            })
        })
    })

    it("Deve apresentar o acordion de condições para uma questão que tenha condição", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getCondicoesAccordion().isDisplayed()).toBeTruthy();
                    done();
                }, 2000)
                
                
            })
        })
    })

    it("Deve apresentar o acordion de repetições para uma questão que tenha repetição", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getRepeticoesAccordion().isDisplayed()).toBeTruthy();
                    done();
                }, 2000)
                
                
            })
        })
    })

    it("Deve apresentar o acordion de funções para uma questão que tenha funções", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getFuncoesAccordion().isPresent()).toBeFalsy();
                    done();
                }, 2000)
                
                
            })
        })
    })*/

    it("Deve apresentar o acordion de array para uma questão que tenha array", (done)=>{
        browser.get("/").then(()=>{
            browser.sleep(1000);
            LoginServiceMock.logar();
            page.navigateTo().then(()=>{
            
                setTimeout(function(){
                    expect(page.getArrayAccordion().isPresent()).toBeFalsy();
                    done();
                }, 2000)
                
                
            })
        })
    })
});
