import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class DeleteAllLearningSessionsAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAllLearningSessions;
}
