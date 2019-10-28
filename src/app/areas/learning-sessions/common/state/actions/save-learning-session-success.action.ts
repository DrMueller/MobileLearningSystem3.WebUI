import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';
import { LearningSession } from '../../models';

export class SaveLearningSessionSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveLearningSessionSuccess;

  public constructor(public readonly savedLearningSession: LearningSession) {
  }
}
