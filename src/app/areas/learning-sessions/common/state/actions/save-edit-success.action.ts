import { Action } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SaveEditSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveEditSuccess;

  public constructor(public readonly savedEntry: LearningSessionEditEntry) {
  }
}
