import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteLearningSessionSuccess;

  public constructor(public readonly deletedId: number) {
  }
}
