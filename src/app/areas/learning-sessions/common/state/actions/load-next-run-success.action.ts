import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class LoadNextRunSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadNextRunSuccess;
}
