import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';
import { Fact } from '../../models';

export class SaveFactAction implements Action {
  public readonly type = FactsActionTypes.SaveFact;

  public constructor(public readonly entry: Fact) {
  }
}
