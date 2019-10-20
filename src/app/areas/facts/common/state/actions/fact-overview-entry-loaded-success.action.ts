import { Action } from '@ngrx/store';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class FactOverviewEntryLoadedSuccessAction implements Action {
  public readonly type = FactsActionTypes.FactOverviewEntryLoadedSuccess;

  public constructor(public readonly entry: FactOverviewEntry) {
  }
}
