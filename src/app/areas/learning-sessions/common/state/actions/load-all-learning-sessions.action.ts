import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class LoadAllLearningSessionsAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadAllLearningSessions;
}
