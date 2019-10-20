import { Action } from '@ngrx/store';
import { FactEditEntry } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class SaveFactDetailsAction implements Action {
  public readonly type = FactsActionTypes.SaveFactDetails;

  public constructor(public readonly entry: FactEditEntry) {
  }
}
