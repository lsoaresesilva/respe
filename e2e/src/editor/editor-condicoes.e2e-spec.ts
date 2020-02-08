
import { browser, by, protractor } from 'protractor';
import { MainPage } from '../main/main.po';
import { EditorPage } from './editor.po';
import { LoginPage } from '../login/login.po';



describe('Testes no editor com questões de condicionais', () => {
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
                            if(linha == "untab"){
                                browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
                            }
                            else{
                                page.getEditorProgramacao().sendKeys(linha)
                                browser.actions().sendKeys(protractor.Key.ENTER).perform();
                            }
                        });

                        // Clicar no botão de envio
                        page.getBotaoExecutar().click().then(r => {

                            setTimeout(function () {
                                expect(page.getStatusExecucao().getText()).toEqual("Sucesso");

                                done();
                            }, 4000)

                        });


                    }, 4000)
                })
            }, 2000)
        })
    }

    

    it("Testar questão Condições -> 01", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "da8487c1-a381-438e-963a-6f5a8b3a152e", [
            "nota = int(input())",
            "if nota > 6:",
            "print('Aprovado')"
        ], done)
    })

    it("Testar questão Condições -> 02", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "25024c58-e46c-4d43-a089-d9c24e96d4ed", [
            "l = input()",
            "if l == 'f':",
            "print('Feminino')"
        ], done)
    })

    it("Testar questão Condições -> 03", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "26d8deb3-3e65-4129-8927-6173aaec54a7", [
            "n = int(input())",
            "n2 = int(input())",
            "media = (n+n2)/2",
            "if media >= 6:",
            "print('Aprovado')",
            "untab",
            "else:",
            "print('Reprovado')"
        ], done)
    })

    it("Testar questão Condições -> 04", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "116a15b2-5e51-41bc-9cc2-3504b4c8f49e", [
            "numeroUm = int(input())",
            "numeroDois = int(input())",
            "if numeroUm > numeroDois:",
            "print(numeroDois, numeroUm)",
            "untab",
            "else:",
            "print(numeroUm, numeroDois)"
        ], done)
    })

    it("Testar questão Condições -> 05", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "116a15b2-5e51-41bc-9cc2-3504b4c8f49e", [
            "numeroUm = int(input())",
            "numeroDois = int(input())",
            "if numeroUm > numeroDois:",
            "print(numeroDois, numeroUm)",
            "untab",
            "else:",
            "print(numeroUm, numeroDois)"
        ], done)
    })

    it("Testar questão Condições -> 06", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "8425f9da-bf08-4a91-8f57-82158eaf1acb", [
            "letra = input()",
            "if letra == 'f' or letra == 'F':",
            "print('Feminino')"
        ], done)
    })

    it("Testar questão Condições -> 07", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "e7cd1250-dcaa-464e-9b07-cbcbf658226f", [
            "codigoUm = input()",
            "codigoDois = input()",
            "if codigoUm == 'ABC' and codigoDois == 'DEF':",
            "print('Bomba desativada')",
        ], done)
    })

    it("Testar questão Condições -> 08", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "d850c341-937f-4436-902e-0bbb5d0f7eb3", [
            "numeroUm = int(input())",
            "numeroDois = int(input())",
            "numeroTres = int(input())",
            "if numeroUm < numeroDois and numeroUm < numeroTres:",
            "print(numeroUm)",
            "untab",
            "elif numeroDois < numeroUm and numeroDois < numeroTres:",
            "print(numeroDois)",
            "untab",
            "else:",
            "print(numeroTres)",
        ], done)
    })

    it("Testar questão Condições -> 09", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "f2fce5f8-6e9a-4807-bec5-901e821c1318", [
            "n = int(input())",
            "if n%5 == 0:",
            "print('Múltiplo')",
            "untab",
            "else:",
            "print('Não é múltiplo')",
        ], done)
    })

    it("Testar questão Condições -> 10", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "85c28df2-70a6-436c-a7d6-8f8e69e3fcad", [
            "n = float(input())",
            "if n < 7:",
            "print('Ácido')",
            "untab",
            "elif n > 7:",
            "print('Básico')",
            "untab",
            "else:",
            "print('Neutro')"
        ], done)
    })

    it("Testar questão Condições -> 11", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "fa6f21ce-fdf8-4a84-9e7b-bde56c570bfb", [
            "idade = int(input())",
            "if idade < 16:",
            "print('Não eleitor')",
            "untab",
            "elif idade >= 16 and idade <= 17 or idade > 65:",
            "print('Eleitor facultativo')",
            "untab",
            "else:",
            "print('Eleitor obrigatório')"
        ], done)
    })

    it("Testar questão Condições -> 11", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "560a0bc3-0d5d-42a7-a6c1-0dba987bfc6a", [
            "letra = input()",
            "if letra == 'a' or letra == 'e' or letra == 'i' or letra == 'o' or letra =='u':",
            "print('Vogal')",
            "untab",
            "else:",
            "print('Não é vogal')"
        ], done)
    })

    it("Testar questão Condições -> 12", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "b63f0dcf-cc18-4f74-aeb2-1cb07c6b6424", [
            "l = input()",
            "if l == 'f' or l == 'F':",
            "print('Feminino')",
            "untab",
            "elif l == 'm' or l == 'M':",
            "print('Masculino')",
            "untab",
            "else:",
            "print('Letra inválida')"
        ], done)
    })

    it("Testar questão Condições -> 13", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "73d29cd6-e65e-461a-b08b-02afc519b784", [
            "salario = int(input())",
            "if salario < 1000:",
            "salario = salario*0.3+salario",
            "untab",
            "elif salario >= 1000 and salario < 2000:",
            "salario = salario*0.1+salario",
            "untab",
            "else:",
            "salario = salario*0.05+salario",
            "untab",
            "print(salario)"
        ], done)
    })

    it("Testar questão Condições -> 14", (done) => {
        runAlgorithm("x6cVrs1hHkKmdRhFBpsf", "ecd37459-f7bb-49a2-80d0-c2b26ca332ef", [
            "n = int(input())",
            "n2 = int(input())",
            "n3 = int(input())",
            "contagem = 0",
            "if n >= 6:",
            "contagem += 1",
            "untab",
            "if n2 >= 6:",
            "contagem += 1",
            "untab",
            "if n3 >= 6:",
            "contagem += 1",
            "untab",
            "print(contagem)"
        ], done)
    })


    /*it("Deve acessar o editor para a questão Bingo", (done) => {
        mainPage.navigateToGrupoExperimental().then(r => {
            setTimeout(function () {
                browser.refresh();
                let EC = protractor.ExpectedConditions;
                page.navigateTo("x6cVrs1hHkKmdRhFBpsf", "0b2920fd-565c-4dab-8c95-c7021fc0b9de").then(() => {
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
