import { Action } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SaveLearningSessionSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveLearningSessionSuccess;

  public constructor(public readonly savedLearningSession: LearningSession) {
  }
}
