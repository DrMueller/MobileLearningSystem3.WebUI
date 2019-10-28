import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';
import { LearningSession } from '../../models';

export class SaveLearningSessionAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveLearningSession;

  public constructor(public editEntry: LearningSession) {
  }
}
