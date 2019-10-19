import { Action } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadEditSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadEditSuccess;

  public constructor(public entry: LearningSessionEditEntry) {
  }
}
