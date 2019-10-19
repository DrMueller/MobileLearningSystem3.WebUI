import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadEditAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadEdit;

  public constructor(public sessionId: number) {
  }
}
