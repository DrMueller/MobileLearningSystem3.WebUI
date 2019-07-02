import { TestBed } from '@angular/core/testing';

import { FactOverviewEntryDataService } from './fact-overview-entry-data.service';

describe('FactOverviewEntryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactOverviewEntryDataService = TestBed.get(FactOverviewEntryDataService);
    expect(service).toBeTruthy();
  });
});
