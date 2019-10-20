import { Action } from '@ngrx/store';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class SaveEditSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.SaveEditSuccess;

  public constructor(public readonly savedEntryId: number) {
  }
}
