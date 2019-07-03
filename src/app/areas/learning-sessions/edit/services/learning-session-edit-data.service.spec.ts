import { TestBed } from '@angular/core/testing';

import { LearningSessionEditDataService } from './learning-session-edit-data.service';

describe('LearningSessionEditDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionEditDataService = TestBed.get(LearningSessionEditDataService);
    expect(service).toBeTruthy();
  });
});
