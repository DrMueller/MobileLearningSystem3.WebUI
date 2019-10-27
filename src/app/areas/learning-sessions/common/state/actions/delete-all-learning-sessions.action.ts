import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteAllLearningSessionsAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAllLearningSessions;
}
