import { TestBed } from '@angular/core/testing';

import { TurmaService } from './turma.service';

describe('TurmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurmaService = TestBed.get(TurmaService);
    expect(service).toBeTruthy();
  });
});
