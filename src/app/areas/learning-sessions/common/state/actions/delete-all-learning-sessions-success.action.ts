import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteAllLearningSessionsSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAllLearningSessionsSuccess;
}
