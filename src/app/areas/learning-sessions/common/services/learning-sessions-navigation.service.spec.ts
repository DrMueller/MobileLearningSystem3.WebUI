import { TestBed } from '@angular/core/testing';

import { LearningSessionsNavigationService } from './learning-sessions-navigation.service';

describe('LearningSessionsNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionsNavigationService = TestBed.get(LearningSessionsNavigationService);
    expect(service).toBeTruthy();
  });
});
