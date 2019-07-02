import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FactEditFormBuilderService {
  public constructor(private formBuilder: FormBuilder) { }

  public buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      questionText: [undefined, [Validators.required]],
      answerText: [undefined, [Validators.required]]
    });
  }
}
