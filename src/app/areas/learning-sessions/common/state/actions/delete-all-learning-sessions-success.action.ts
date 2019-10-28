import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class DeleteAllLearningSessionsSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAllLearningSessionsSuccess;
}
