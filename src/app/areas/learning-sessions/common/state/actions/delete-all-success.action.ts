import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteAllSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAllSuccess;
}
