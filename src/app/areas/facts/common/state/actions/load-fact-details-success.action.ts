import { Action } from '@ngrx/store';
import { FactEditEntry } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class LoadFactDetailsSuccessAction implements Action {
  public readonly type = FactsActionTypes.LoadFactDetailsSuccess;

  public constructor(public readonly entry: FactEditEntry) {
  }
}
