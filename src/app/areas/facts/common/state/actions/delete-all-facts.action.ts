
import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class DeleteAllFactsAction implements Action {
  public readonly type = FactsActionTypes.DeleteAllFacts;

  public constructor() {
  }
}
