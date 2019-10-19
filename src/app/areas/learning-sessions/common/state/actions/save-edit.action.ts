import { Action } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SaveEditAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveEdit;

  public constructor(public editEntry: LearningSessionEditEntry) {
  }
}
