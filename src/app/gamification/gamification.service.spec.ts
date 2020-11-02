import { TestBed } from '@angular/core/testing';

import { GamificationFacade } from './gamification.service';

describe('GamificationService', () => {
  let service: GamificationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamificationFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
