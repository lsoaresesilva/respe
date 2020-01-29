
import { browser, by, protractor } from 'protractor';
import { MainPage } from '../main/main.po';
import { EditorPage } from './editor.po';
import { LoginPage } from '../login/login.po';



describe('Listagem planejamento', () => {
    let page: EditorPage;
    let mainPage: MainPage;


    browser.ignoreSynchronization = true; // Necessário, pois neste teste é feito um redirect por meio do router do Angular. sem isso o protractor não consegue funcionar

    beforeAll(() => {
        page = new EditorPage();
        mainPage = new MainPage();
    });

    function runAlgorithm(assunto, questao, algoritmo, done) {
        mainPage.navigateToGrupoExperimental().then(r => {
            setTimeout(function () {
                browser.refresh();
                let EC = protractor.ExpectedConditions;
                page.navigateTo(assunto, questao).then(() => {
                    setTimeout(function () {
                        expect(page.getEditorProgramacao().isDisplayed()).toBeTruthy();

                        page.clear();

                        algoritmo.forEach(linha => {
                            page.getEditorProgramacao().sendKeys(linha)
                            browser.actions().sendKeys(protractor.Key.ENTER).perform();
                        });

                        // Clicar no botão de envio
                        page.getBotaoExecutar().click().then(r => {

                            setTimeout(function () {
                                expect(page.getStatusExecucao().getText()).toEqual("Sucesso");

                                done();
                            }, 6000)

                        });


                    }, 5000)
                })
            }, 2000)
        })
    }

    it("Testar questão Variáveis -> 1", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "0b2920fd-565c-4dab-8c95-c7021fc0b9de", [
            "x = input()",
            "print('O número sorteado foi:', x)"
        ], done)
    })

    it("Testar questão Variáveis -> 2", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "71b67722-4639-4fcf-be03-574356d5b70a", [
            "a = int(input())",
            "b = int(input())",
            "c = a + b",
            "print(c)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 3", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "38bd2aec-f62f-475e-b010-20af623db20e", [
            "d = int(input())",
            "a = 3.14*d",
            "print('A área é:', a)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 4", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "f369a1f7-c333-4c23-81ac-89639608eb35", [
            "s1 = input()",
            "s2 = input()",
            "print(s1+s2)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 5", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "c7cd8e92-da1a-412a-a0b3-4498d031545a", [
            "a = int(input())",
            "b = int(input())",
            "c = int(input())",
            "d = int(input())",
            "print(a*b-c*d)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 6", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "4ad830c8-9c86-481a-93d7-8d91a08e36ce", [
            "n = int(input())",
            "r = n*100",
            "print(r)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 7", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "e7292d21-2475-479e-bfa7-06fbce4a6931", [
            "b = int(input())",
            "bm = int(input())",
            "h = int(input())",
            "r = ((b+bm)*h)/2",
            "print(r)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 8", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "5f7f15ca-9d92-4990-8658-8635b573c0ed", [
            "print('Oi')",
            "d = int(input())",
            "km = int(input())",
            "v = 90*d+12*km",
            "print(v)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 9", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "f7118cc8-dbfc-497d-80d2-d0cda2a57fa8", [
            "import math",
            "a = float(input())",
            "b = float(input())",
            "c = math.sqrt(a*a+b*b)",
            "print(c)"
        ], done)
    }) 

    it("Testar questão Variáveis -> 10", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "43789fa2-b614-4e03-a8c8-1494b3e3d9e0", [
            "n = int(input())",
            "print(n-1,n+1)"
        ], done)
    })

    it("Testar questão Condições -> 01", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "da8487c1-a381-438e-963a-6f5a8b3a152e", [
            "nota = int(input())",
            "if nota > 6:",
            "    print('Aprovado')"
        ], done)
    })

    it("Testar questão Condições -> 02", (done) => {
        runAlgorithm("jW22yOF9a28N0aQlNNGR", "26d8deb3-3e65-4129-8927-6173aaec54a7", [
            "n = int(input())",
            "n2 = int(input())",
            "media = (n+n2)/2",
            "print(media)",
            "if media >= 6:",
            "    print('Aprovado')",
            "else:",
            "    print('Reprovado')"
        ], done)
    })


    /*it("Deve acessar o editor para a questão Bingo", (done) => {
        mainPage.navigateToGrupoExperimental().then(r => {
            setTimeout(function () {
                browser.refresh();
                let EC = protractor.ExpectedConditions;
                page.navigateTo("jW22yOF9a28N0aQlNNGR", "0b2920fd-565c-4dab-8c95-c7021fc0b9de").then(() => {
                    setTimeout(function () {
                        expect(page.getEditorProgramacao().isDisplayed()).toBeTruthy();

                        page.clear();

                        page.getEditorProgramacao().sendKeys("x = input()")
                        browser.actions().sendKeys(protractor.Key.ENTER).perform();
                        page.getEditorProgramacao().sendKeys("print('O número sorteado foi:', x)")

                        // Clicar no botão de envio
                        page.getBotaoExecutar().click().then(r => {
                            console.log("Clicou")
                            // Verificar se o status está sucesso
                            setTimeout(function () {
                                console.log("Comparar")
                                expect(page.getStatusExecucao().getText()).toEqual("Sucesso");

                                done();
                            }, 6000)

                        });


                    }, 5000)
                })
            }, 2000)
        })
    })*/

    /*it("Deve acessar o editor para a questão Bingo", (done)=>{
        this.;

    })*/

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
