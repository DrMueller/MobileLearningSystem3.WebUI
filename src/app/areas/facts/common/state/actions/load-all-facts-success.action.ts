import { Action } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class LoadAllFactsSuccessAction implements Action {
  public readonly type = FactsActionTypes.LoadAllFactsSuccess;

  public constructor(public readonly entries: Fact[]) {

  }
}
