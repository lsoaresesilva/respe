import { TestBed } from '@angular/core/testing';

import { RastrearErrosPythonService } from './rastrear-erros-python.service';

describe('RastrearErrosPythonService', () => {
  let service: RastrearErrosPythonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RastrearErrosPythonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
