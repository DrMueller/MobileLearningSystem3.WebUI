import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class DeleteFactSuccessAction implements Action {
  public readonly type = FactsActionTypes.DeleteFactSuccess;

  public constructor(public readonly deletedId: number) {
  }
}
