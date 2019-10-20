import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SelectNextSessionRunFactsAction implements Action {
  public readonly type = LearningSessionsActionTypes.SelectNextSessionRunFacts;

  public constructor(public readonly currentSessionId: number) {
  }
}
