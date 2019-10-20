import {
  DeleteFactAction, DeleteFactSuccessAction,
  LoadFactDetailsSuccessAction, LoadFactsOverviewSuccessAction, SaveFactDetailsAction, SaveFactDetailsSuccessAction
} from './actions';
import { DeleteAllFactsSuccessAction } from './actions/delete-all-facts-success.action';
import { DeleteAllFactsAction } from './actions/delete-all-facts.action';
import { FactOverviewEntryLoadedSuccessAction } from './actions/fact-overview-entry-loaded-success.action';
import { LoadFactDetailsAction } from './actions/load-fact-details.action';
import { LoadFactsOverviewAction } from './actions/load-facts-overview.action';

export type FactsActions =
  LoadFactsOverviewAction | LoadFactsOverviewSuccessAction |
  LoadFactDetailsAction | LoadFactDetailsSuccessAction |
  SaveFactDetailsAction | SaveFactDetailsSuccessAction |
  DeleteAllFactsAction | DeleteAllFactsSuccessAction |
  DeleteFactAction | DeleteFactSuccessAction |
  FactOverviewEntryLoadedSuccessAction;
