import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteSuccess;

  public constructor(public readonly deletedId: number) {
  }
}
