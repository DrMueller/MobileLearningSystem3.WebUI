import { Action } from '@ngrx/store';

import { FactsActionTypes } from '..';

export class LoadFactsOverviewAction implements Action {
  public readonly type = FactsActionTypes.LoadFactsOverview;
}
