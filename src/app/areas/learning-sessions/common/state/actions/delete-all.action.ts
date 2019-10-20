import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteAllAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteAll;
}
