import { TestBed } from '@angular/core/testing';

import { TipAutorregulacaoService } from './tip-autorregulacao.service';

describe('TipAutorregulacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipAutorregulacaoService = TestBed.get(TipAutorregulacaoService);
    expect(service).toBeTruthy();
  });
});
