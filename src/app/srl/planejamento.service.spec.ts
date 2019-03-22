import { TestBed } from '@angular/core/testing';

import { PlanejamentoService } from './planejamento.service';

describe('PlanejamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanejamentoService = TestBed.get(PlanejamentoService);
    expect(service).toBeTruthy();
  });
});
