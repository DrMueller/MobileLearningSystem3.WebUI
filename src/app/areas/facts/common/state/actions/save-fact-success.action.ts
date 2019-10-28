import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';
import { Fact } from '../../models/fact.model';

export class SaveFactSuccessAction implements Action {
  public readonly type = FactsActionTypes.SaveFactSuccess;

  public constructor(public readonly savedFact: Fact) {
  }
}
