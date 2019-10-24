import { Action } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SaveLearningSessionAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveLearningSession;

  public constructor(public editEntry: LearningSession) {
  }
}
