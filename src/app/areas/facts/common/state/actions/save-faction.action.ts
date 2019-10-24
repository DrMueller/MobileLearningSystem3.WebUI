import { Action } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class SaveFactAction implements Action {
  public readonly type = FactsActionTypes.SaveFact;

  public constructor(public readonly entry: Fact) {

  }
}
