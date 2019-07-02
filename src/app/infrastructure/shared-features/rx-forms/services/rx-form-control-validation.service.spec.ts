import { TestBed } from '@angular/core/testing';

import { RxFormControlValidationService } from './rx-form-control-validation.service';
import { VALIDATION_ERROR_MAPPER_TOKEN } from './validation/constants';

describe('RxFormControlValidationService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: VALIDATION_ERROR_MAPPER_TOKEN,
        multi: false,
        useValue: {}
      },
    ]
  }));

  it('should be created', () => {
    const service: RxFormControlValidationService = TestBed.get(RxFormControlValidationService);
    expect(service).toBeTruthy();
  });
});
