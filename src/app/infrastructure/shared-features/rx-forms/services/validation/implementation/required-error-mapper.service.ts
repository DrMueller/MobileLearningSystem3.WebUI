import { Injectable } from '@angular/core';

import { ValidationError, ValidationErrorMappingResult } from '../../../models';
import { IValidationErrorMapperService } from '../validation-error-mapper-service.interface';

@Injectable({
  providedIn: 'root'
})
export class RequiredErrorMapperService implements IValidationErrorMapperService {
  private readonly errorKey: string = 'required';

  public map(errorKey: string, _: any): ValidationErrorMappingResult {

    if (errorKey !== this.errorKey) {
      return ValidationErrorMappingResult.createNonSuccess();
    }

    return new ValidationErrorMappingResult(true, new ValidationError(this.errorKey, 'Field is required.'));
  }
}
