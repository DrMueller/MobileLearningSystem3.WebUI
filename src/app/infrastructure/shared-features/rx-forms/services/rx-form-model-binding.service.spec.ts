import { TestBed } from '@angular/core/testing';

import { RxFormModelBindingService } from './rx-form-model-binding.service';

describe('RxFormModelBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxFormModelBindingService = TestBed.get(RxFormModelBindingService);
    expect(service).toBeTruthy();
  });
});
