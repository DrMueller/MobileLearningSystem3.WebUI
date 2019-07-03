import { TestBed } from '@angular/core/testing';

import { RunFactDataService } from './run-fact-data.service';

describe('RunFactDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunFactDataService = TestBed.get(RunFactDataService);
    expect(service).toBeTruthy();
  });
});
