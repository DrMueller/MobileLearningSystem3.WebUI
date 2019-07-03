import { TestBed } from '@angular/core/testing';

import { FactsSelectionColDefBuilderService } from './facts-selection-col-def-builder.service';

describe('FactsSelectionColDefBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactsSelectionColDefBuilderService = TestBed.get(FactsSelectionColDefBuilderService);
    expect(service).toBeTruthy();
  });
});
