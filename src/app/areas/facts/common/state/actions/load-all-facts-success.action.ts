import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';
import { Fact } from '../../models';

export class LoadAllFactsSuccessAction implements Action {
  public readonly type = FactsActionTypes.LoadAllFactsSuccess;

  public constructor(public readonly entries: Fact[]) {
  }
}
