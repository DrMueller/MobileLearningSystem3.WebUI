import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class LoadAllFactsAction implements Action {
  public readonly type = FactsActionTypes.LoadAllFacts;
}
