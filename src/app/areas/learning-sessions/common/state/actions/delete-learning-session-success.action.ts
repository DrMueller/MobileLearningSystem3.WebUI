import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class DeleteLearningSessionSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteLearningSessionSuccess;

  public constructor(public readonly deletedId: number) {
  }
}
