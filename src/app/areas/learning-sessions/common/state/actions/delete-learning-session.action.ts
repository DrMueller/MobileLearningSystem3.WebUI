import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class DeleteLearningSessionAction implements Action {
  public readonly type = LearningSessionsActionTypes.DeleteLearningSession;

  public constructor(public sessionId: number) {
  }
}
