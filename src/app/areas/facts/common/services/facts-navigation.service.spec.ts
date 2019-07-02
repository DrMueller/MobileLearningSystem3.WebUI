import { TestBed } from '@angular/core/testing';

import { FactsNavigationService } from './facts-navigation.service';

describe('FactsNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactsNavigationService = TestBed.get(FactsNavigationService);
    expect(service).toBeTruthy();
  });
});
