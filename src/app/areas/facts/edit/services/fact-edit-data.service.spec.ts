import { TestBed } from '@angular/core/testing';

import { FactEditDataService } from './fact-edit-data.service';

describe('FactEditDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactEditDataService = TestBed.get(FactEditDataService);
    expect(service).toBeTruthy();
  });
});
