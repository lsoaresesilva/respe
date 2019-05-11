import { TestBed } from '@angular/core/testing';

import { MaterialEstudoService } from './material-estudo.service';

describe('MaterialEstudoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialEstudoService = TestBed.get(MaterialEstudoService);
    expect(service).toBeTruthy();
  });
});
