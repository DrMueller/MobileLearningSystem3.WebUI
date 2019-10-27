import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class LoadLearningSessionAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadLearningSession;

  public constructor(public readonly learningSessionId: number) {
  }
}
