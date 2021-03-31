import { TestBed } from '@angular/core/testing';

import { GravacaoVideoService } from './gravacao-video.service';

describe('GravacaoVideoService', () => {
  let service: GravacaoVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravacaoVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
