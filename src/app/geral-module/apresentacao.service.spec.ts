import { TestBed } from '@angular/core/testing';

import { ApresentacaoService } from './apresentacao.service';

describe('ApresentacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApresentacaoService = TestBed.get(ApresentacaoService);
    expect(service).toBeTruthy();
  });
});
