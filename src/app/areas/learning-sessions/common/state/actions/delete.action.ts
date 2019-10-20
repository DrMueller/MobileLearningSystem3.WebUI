import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class DeleteAction implements Action {
  public readonly type = LearningSessionsActionTypes.Delete;

  public constructor(public sessionId: number) {
  }
}
