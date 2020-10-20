import { TestBed } from '@angular/core/testing';

import { RastrearTempoOnlineService } from './rastrear-tempo-online.service';

describe('RastrearTempoOnlineService', () => {
  let service: RastrearTempoOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RastrearTempoOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
