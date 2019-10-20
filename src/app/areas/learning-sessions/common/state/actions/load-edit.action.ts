import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadEditSessionAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadEditSession;

  public constructor(public sessionId: number) {
  }
}
