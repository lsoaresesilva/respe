import { TestBed, inject } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { MonitoramentoMotivacionalService } from './monitoramento-motivacional.service';

describe('MonitoramentoMotivacionalService', () => {
  let service: MonitoramentoMotivacionalService;
  let spy:jasmine.Spy;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers:[MonitoramentoMotivacionalService, DialogService]
    });
    inject([MonitoramentoMotivacionalService, DialogService], (ms:MonitoramentoMotivacionalService, cs:ConfirmationService) => {
      service = ms;
    })();
  });

  beforeEach(()=>{
    spy = spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return null;
    });
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Deve retornar true", ()=>{
    expect(service.exibirDialogProgressoAssunto(30)).toBeTruthy();
  })

  it("Deve retornar false quando a dialog tiver sido exibida para uma mesma faixa de progresso", ()=>{
    spy.and.returnValue("30");
    expect(service.exibirDialogProgressoAssunto(30)).toBeFalsy();
    expect(service.exibirDialogProgressoAssunto(31)).toBeFalsy();
  })

  it("Deve retornar true, pois o progresso atual é maior e está fora da faixa que o progresso anterior", ()=>{
    spy.and.returnValue("30");
    expect(service.exibirDialogProgressoAssunto(50)).toBeTruthy();
    spy.and.returnValue("50");
    expect(service.exibirDialogProgressoAssunto(51)).toBeFalsy();
  })

  it("Deve retornar a mensagem adequada", ()=>{
    expect(service.getMensagemProgressoAssunto(30)).toEqual("Você ultrapassou 30% do progresso no assunto!");
    expect(service.getMensagemProgressoAssunto(51)).toEqual("Você ultrapassou 50% do progresso no assunto!");
    expect(service.getMensagemProgressoAssunto(70)).toEqual("Você ultrapassou 70% do progresso no assunto!");
    expect(service.getMensagemProgressoAssunto(100)).toEqual("Você concluiu o assunto!");
  })

  it("Deve retorna true para quando não tiver sido exibida uma msg de error quotient", ()=>{
    spy.and.returnValue(null);
    expect(service.exibirDialogErrorQuotient()).toBeTruthy();
  })

  it("Deve retorna false para quando tiver sido exibida uma msg de error quotient a menos de 3 dias", ()=>{
    spy.and.returnValue(JSON.stringify(new Date()));
    expect(service.exibirDialogErrorQuotient()).toBeFalsy();
  })

  it("Deve retorna true para quando tiver sido exibida uma msg de error quotient a mais de 3 dias", ()=>{
    spy.and.returnValue(JSON.stringify(new Date("2020-11-17")));
    expect(service.exibirDialogErrorQuotient()).toBeTruthy();
  })

  it("Deve retorna uma msg motivadora para error quotient", ()=>{
    spy.and.returnValue(JSON.stringify(new Date("2020-11-17")));
    expect(service.exibirDialogErrorQuotient()).toBeTruthy();
  })
});
