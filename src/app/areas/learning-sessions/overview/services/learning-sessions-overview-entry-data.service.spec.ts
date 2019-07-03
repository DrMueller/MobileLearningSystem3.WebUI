import { TestBed } from '@angular/core/testing';

import { LearningSessionsOverviewEntryDataService } from './learning-sessions-overview-entry-data.service';

describe('LearningSessionsOverviewEntryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionsOverviewEntryDataService = TestBed.get(LearningSessionsOverviewEntryDataService);
    expect(service).toBeTruthy();
  });
});
