import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';
import { LearningSession } from '../../models';

export class LoadLearningSessionSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadLearningSessionSuccess;

  public constructor(public readonly learningSession: LearningSession) {
  }
}
