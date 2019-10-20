import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadRunFactsAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadRunFacts;

  public constructor(public sessionId: number) {
  }
}
