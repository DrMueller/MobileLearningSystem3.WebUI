import { Action } from '@ngrx/store';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';

import { FactsActionTypes } from '..';

export class LoadFactsOverviewSuccessAction implements Action {
  public readonly type = FactsActionTypes.LoadFactsOverviewSuccess;

  public constructor(public readonly entries: FactOverviewEntry[]) {

  }
}
