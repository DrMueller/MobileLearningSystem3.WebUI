import { Injectable } from '@angular/core';

import { ValidationErrorMappingResult } from '../../../models/validation-error-mapping-result.model';
import { ValidationError } from '../../../models/validation-error.model';
import { IValidationErrorMapperService } from '../validation-error-mapper-service.interface';

@Injectable({
  providedIn: 'root'
})
export class MaxLengthErrorMapperService implements IValidationErrorMapperService {
  private readonly errorKey: string = 'maxlength';


  public map(errorKey: string, error: any): ValidationErrorMappingResult {
    if (errorKey !== this.errorKey) {
      return ValidationErrorMappingResult.createNonSuccess();
    }


    const message = `Expected length is maximum of ${error.requiredLength}, actual length is ${error.actualLength}.`;
    return new ValidationErrorMappingResult(true, new ValidationError(this.errorKey, message));
  }
}
