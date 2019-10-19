import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadOverview;
}
