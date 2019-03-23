import { TestBed } from '@angular/core/testing';

import { SubmissoesService } from './submissoes.service';
import Submissao from './model/submissao';
import { CodigoInvalidoErro } from './model/erros/codigoInvalidoErro';
/*
describe('EnvioCodigoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissoesService = TestBed.get(SubmissoesService);
    expect(service).toBeTruthy();
  });

  it("Não deve salvar um código enviado se ele estiver sem código e outras informações", ()=>{
    const service: SubmissoesService = TestBed.get(SubmissoesService);
    let codigoEnviado = new Submissao("1", "bla");
    expect(service.salvar(codigoEnviado)).toThrowError(CodigoInvalidoErro);
  });
});
*/