import { TestBed } from '@angular/core/testing';

import { AssuntoService } from './assunto.service';

describe('AssuntoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssuntoService = TestBed.get(AssuntoService);
    expect(service).toBeTruthy();
  });
});
