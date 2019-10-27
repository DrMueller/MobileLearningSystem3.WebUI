import {
  DeleteFactAction, DeleteFactSuccessAction, LoadAllFactsSuccessAction, SaveFactSuccessAction,
} from './actions';
import { DeleteAllFactsSuccessAction } from './actions/delete-all-facts-success.action';
import { DeleteAllFactsAction } from './actions/delete-all-facts.action';
import { LoadAllFactsAction } from './actions/load-all-facts.action';
import { LoadFactSuccessAction } from './actions/load-fact-success.action';
import { LoadFactAction } from './actions/load-fact.action';

export type FactsActions =
  LoadFactAction | LoadFactSuccessAction |
  LoadAllFactsAction | LoadAllFactsSuccessAction |
  DeleteAllFactsAction | DeleteAllFactsSuccessAction |
  DeleteFactAction | DeleteFactSuccessAction |
  SaveFactSuccessAction;
