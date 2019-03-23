import { TestBed } from '@angular/core/testing';

import { QuestaoService } from './questao.service';

describe('QuestaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestaoService = TestBed.get(QuestaoService);
    expect(service).toBeTruthy();
  });
});
