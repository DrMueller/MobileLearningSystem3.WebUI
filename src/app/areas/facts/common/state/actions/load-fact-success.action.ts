import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';
import { Fact } from '../../models';

export class LoadFactSuccessAction implements Action {
  public readonly type = FactsActionTypes.LoadFactSuccess;

  public constructor(public readonly fact: Fact) {
  }
}
