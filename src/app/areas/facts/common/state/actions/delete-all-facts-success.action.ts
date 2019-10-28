import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class DeleteAllFactsSuccessAction implements Action {
  public readonly type = FactsActionTypes.DeleteAllFactsSuccess;
}
