import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class SaveFactDetailsSuccessAction implements Action {
  public readonly type = FactsActionTypes.SaveFactDetailsSuccess;

  public constructor(public readonly savedEntryId: number) {
  }
}
