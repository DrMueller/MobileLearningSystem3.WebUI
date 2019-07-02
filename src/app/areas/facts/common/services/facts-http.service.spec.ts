import { TestBed } from '@angular/core/testing';

import { FactsHttpService } from './facts-http.service';

describe('FactsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactsHttpService = TestBed.get(FactsHttpService);
    expect(service).toBeTruthy();
  });
});
