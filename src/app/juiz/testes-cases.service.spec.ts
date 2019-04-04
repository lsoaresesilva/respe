import { TestBed } from '@angular/core/testing';

import { TestesCasesService } from './testes-cases.service';

describe('TestesCasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestesCasesService = TestBed.get(TestesCasesService);
    expect(service).toBeTruthy();
  });
});
