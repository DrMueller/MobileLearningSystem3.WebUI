import { TestBed } from '@angular/core/testing';
import { AppSettingsSingletonService } from 'src/app/infrastructure/core-services/app-settings/services';
import { provideMock } from 'src/app/testing-extensions/functions';

import { AppInitService } from './app-init.service';

describe('AppInitService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideMock(AppSettingsSingletonService)
    ]
  }));

  it('should be created', () => {
    const service: AppInitService = TestBed.get(AppInitService);
    expect(service).toBeTruthy();
  });
});
