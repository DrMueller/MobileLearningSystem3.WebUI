import { TestBed } from '@angular/core/testing';

import { LearningSessionEditFormBuilderService } from './learning-session-edit-form-builder.service';

describe('LearningSessionEditFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningSessionEditFormBuilderService = TestBed.get(LearningSessionEditFormBuilderService);
    expect(service).toBeTruthy();
  });
});
