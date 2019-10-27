import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class LoadFactAction implements Action {
  public readonly type = FactsActionTypes.LoadFact;

  public constructor(public readonly factId: number) {
  }
}
