import { TestBed } from '@angular/core/testing';

import { LearningSessionsOverviewColDefBuilderService } from './learning-sessions-overview-col-def-builder.service';

describe('LearningSessionsOverviewColDefBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionsOverviewColDefBuilderService = TestBed.get(LearningSessionsOverviewColDefBuilderService);
    expect(service).toBeTruthy();
  });
});
