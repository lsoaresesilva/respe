import { ListagemPlanejamentoPage } from './listagem-planejamento.po';
import { browser, by, protractor } from 'protractor';
import { MainPage } from '../main/main.po';
import LoginServiceMock from '../utility/login.service';
import { Groups } from '../../../src/app/model/experimento/lib/enum/groups';
import { Planejamento } from '../../../src/app/model/planejamento';
import Usuario from '../../../src/app/model/usuario';
import { PerfilUsuario } from '../../../src/app/model/enums/perfilUsuario';
import { Assunto } from '../../../src/app/model/assunto';

describe('Listagem planejamento', () => {
    let page: ListagemPlanejamentoPage;

    let mainPage: MainPage;

    browser.ignoreSynchronization = true; // Necessário, pois neste teste é feito um redirect por meio do router do Angular. sem isso o protractor não consegue funcionar

    beforeAll(() => {
        page = new ListagemPlanejamentoPage();
        mainPage = new MainPage();
    });

    /*it('deve garantir que usuários do grupo controle não irão acessar a página', (done) => {

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
                    }, 5000)
                })
            }, 2000)
        })
    });

    it("Deve exibir uma dialog quando o usuário for do grupo experimental", done => {
        browser.get("/").then(() => {
            LoginServiceMock.logar(Groups.experimentalA);
            page.navigateTo().then(() => {
                setTimeout(function () {
                    expect(page.getPlanejamentoDialog().isDisplayed()).toBeTruthy();
                    done();
                }, 2000)
            })
        })
    })

    it("Não deve exibir a dialog de planejamento duas vezes quando o usuário for do grupo experimental", done => {
        browser.get("/").then(() => {
            LoginServiceMock.logar(Groups.experimentalA);
            page.navigateTo().then(() => {
                setTimeout(function () {
                    page.navigateTo().then(() => {
                        setTimeout(function () {
                            expect(page.getPlanejamentoDialog().isDisplayed()).toBeFalsy();
                            done();
                        }, 2000)
                    });
                }, 2000)
            })
        })
    })

    it('deve garantir que usuários do grupo controle não irão acessar a página', (done) => {

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
                    }, 5000)
                })
            }, 2000)
        })
    });

    it("Deve listar os planejamentos cadastrados", (done)=>{
        let e = new Usuario(null, null, null, PerfilUsuario.estudante, Groups.experimentalA);
        e.save().subscribe(r=>{
            let p:Planejamento = new Planejamento(null, e, new Assunto("12345", "variáveis"), 10, "alta", "fácil", "bla", false, null);
            p.save().subscribe(rp=>{
                LoginServiceMock.logar(e.grupoExperimento, e.pk());
                page.navigateTo().then(()=>{
                    expect(page.getPlanejamentoLinhaTabela(0).isDisplayed()).toBeTruthy();
                    Planejamento.delete(p.pk()).subscribe(()=>{
                        Usuario.delete(e.pk()).subscribe(()=>{
                            done();
                        })
                    })

                })
            })
        })
        
    })*/

});
