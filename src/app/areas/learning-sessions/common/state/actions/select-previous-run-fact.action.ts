import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SelectPreviousRunFactAction implements Action {
  public readonly type = LearningSessionsActionTypes.SelectPreviousRunFact;
}
