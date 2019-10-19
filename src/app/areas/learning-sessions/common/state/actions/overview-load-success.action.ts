import { Action } from '@ngrx/store';

import { LearningSessionOverviewEntry } from '../../../overview/models';
import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class OverviewLoadSuccesssAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadOverviewSuccess;

  public constructor(public overview: LearningSessionOverviewEntry[]) {
  }
}
