import { TestBed } from '@angular/core/testing';

import { AnalisarObjetivosService } from './analisar-objetivos.service';

describe('AnalisarObjetivosService', () => {
  let service: AnalisarObjetivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisarObjetivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
