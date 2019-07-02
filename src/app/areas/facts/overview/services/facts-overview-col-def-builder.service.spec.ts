import { TestBed } from '@angular/core/testing';

import { FactsOverviewColDefBuilderService } from './facts-overview-col-def-builder.service';

describe('FactsOverviewColDefBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactsOverviewColDefBuilderService = TestBed.get(FactsOverviewColDefBuilderService);
    expect(service).toBeTruthy();
  });
});
