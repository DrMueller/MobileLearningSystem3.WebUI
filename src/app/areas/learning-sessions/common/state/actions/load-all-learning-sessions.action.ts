import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadAllLearningSessionsAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadAllLearningSessions;
}
