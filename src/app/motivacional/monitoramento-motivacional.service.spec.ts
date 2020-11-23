import { TestBed, inject } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

import { MonitoramentoMotivacionalService } from './monitoramento-motivacional.service';

describe('MonitoramentoMotivacionalService', () => {
  let service: MonitoramentoMotivacionalService;
  let spy:jasmine.Spy;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers:[MonitoramentoMotivacionalService, ConfirmationService]
    });
    inject([MonitoramentoMotivacionalService, ConfirmationService], (ms:MonitoramentoMotivacionalService, cs:ConfirmationService) => {
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

  })
});
