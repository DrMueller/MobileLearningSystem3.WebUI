import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionEditFormBuilderService {
  public constructor(private formBuilder: FormBuilder) { }

  public buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      sessionName: [undefined, [Validators.required]]
    });
  }
}
