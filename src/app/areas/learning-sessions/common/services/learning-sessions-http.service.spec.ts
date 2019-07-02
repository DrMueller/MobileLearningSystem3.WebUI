import { TestBed } from '@angular/core/testing';

import { LearningSessionsHttpService } from './learning-sessions-http.service';

describe('LearningSessionsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionsHttpService = TestBed.get(LearningSessionsHttpService);
    expect(service).toBeTruthy();
  });
});
