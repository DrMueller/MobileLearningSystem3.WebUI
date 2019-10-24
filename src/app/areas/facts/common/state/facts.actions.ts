import {
  DeleteFactAction, DeleteFactSuccessAction, LoadAllFactsSuccessAction, SaveFactSuccessAction,
} from './actions';
import { DeleteAllFactsSuccessAction } from './actions/delete-all-facts-success.action';
import { DeleteAllFactsAction } from './actions/delete-all-facts.action';
import { LoadAllFactsAction } from './actions/load-all-facts.action';

export type FactsActions =
  LoadAllFactsAction | LoadAllFactsSuccessAction |
  DeleteAllFactsAction | DeleteAllFactsSuccessAction |
  DeleteFactAction | DeleteFactSuccessAction |
  SaveFactSuccessAction;
