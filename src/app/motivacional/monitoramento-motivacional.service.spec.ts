import { TestBed } from '@angular/core/testing';

import { MonitoramentoMotivacionalService } from './monitoramento-motivacional.service';

describe('MonitoramentoMotivacionalService', () => {
  let service: MonitoramentoMotivacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoramentoMotivacionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
