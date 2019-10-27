import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';

export class LoadNextRunAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadNextRun;

  public constructor(public readonly currentLearningSessionId: number) {
  }
}
