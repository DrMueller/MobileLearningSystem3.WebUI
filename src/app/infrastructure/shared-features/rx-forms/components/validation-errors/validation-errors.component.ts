import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationError } from '../../models';
import { RxFormControlValidationService } from '../../services/rx-form-control-validation.service';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent {
  private _formControlToValidate: FormControl;

  public constructor(private validationService: RxFormControlValidationService) {
  }

  @Input() public set formControlToValidate(formControl: FormControl) {
    this._formControlToValidate = formControl;
  }

  public get isFormControlValid(): boolean {
    return this.validationService.checkIfFormControlIsValid(this._formControlToValidate);
  }

  public get validationErrors(): ValidationError[] {
    return this.validationService.validateFormControl(this._formControlToValidate);
  }
}
