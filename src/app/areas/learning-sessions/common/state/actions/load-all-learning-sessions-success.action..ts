import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '..';
import { LearningSession } from '../../models';

export class LoadAllLearningSessionsSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadAllLearningSessionsSuccess;

  public constructor(public overview: LearningSession[]) {
  }
}
