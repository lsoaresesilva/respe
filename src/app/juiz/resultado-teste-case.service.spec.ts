import { TestBed } from '@angular/core/testing';

import { ResultadoTesteCaseService } from './resultado-teste-case.service';

describe('ResultadoTesteCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultadoTesteCaseService = TestBed.get(ResultadoTesteCaseService);
    expect(service).toBeTruthy();
  });
});
