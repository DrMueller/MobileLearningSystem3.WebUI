import { TestBed } from '@angular/core/testing';

import { FactEditFormBuilderService } from './fact-edit-form-builder.service';

describe('FactEditFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactEditFormBuilderService = TestBed.get(FactEditFormBuilderService);
    expect(service).toBeTruthy();
  });
});
