import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class DeleteFactAction implements Action {
  public readonly type = FactsActionTypes.DeleteFact;

  public constructor(public readonly factId: number) {
  }
}
