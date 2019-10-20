import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class LoadFactDetailsAction implements Action {
  public readonly type = FactsActionTypes.LoadFactDetails;

  public constructor(public readonly factId: number) {

  }
}
