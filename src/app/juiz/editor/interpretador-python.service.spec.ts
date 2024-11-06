import { TestBed } from '@angular/core/testing';

import { InterpretadorPythonService } from './interpretador-python.service';

describe('InterpretadorPythonService', () => {
  let service: InterpretadorPythonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpretadorPythonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
