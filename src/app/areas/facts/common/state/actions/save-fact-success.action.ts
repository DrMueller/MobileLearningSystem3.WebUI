import { Action } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class SaveFactSuccessAction implements Action {
  public readonly type = FactsActionTypes.SaveFactSuccess;

  public constructor(public readonly savedFact: Fact) {
  }
}
