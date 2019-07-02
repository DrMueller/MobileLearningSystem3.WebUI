import { TestBed } from '@angular/core/testing';

import { AppNavigationEntryFactoryService } from './app-navigation-entry-factory.service';

describe('AppNavigationEntryFactoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    }));

  it('should be created', () => {
    const service: AppNavigationEntryFactoryService = TestBed.get(AppNavigationEntryFactoryService);
    expect(service).toBeTruthy();
  });
});
