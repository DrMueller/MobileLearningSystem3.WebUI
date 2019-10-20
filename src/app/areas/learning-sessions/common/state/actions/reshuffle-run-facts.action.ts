import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class ReshuffleRunFacts implements Action {
  public readonly type = LearningSessionsActionTypes.ReshuffleRunFacts;
}
