import { TestBed } from '@angular/core/testing';

import { AutoreflexaoService } from './autoreflexao.service';

describe('AutoreflexaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoreflexaoService = TestBed.get(AutoreflexaoService);
    expect(service).toBeTruthy();
  });
});
