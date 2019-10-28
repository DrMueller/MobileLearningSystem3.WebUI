import {
  DeleteAllFactsAction, DeleteAllFactsSuccessAction, DeleteFactAction,
  DeleteFactSuccessAction, LoadAllFactsAction, LoadAllFactsSuccessAction,
  LoadFactAction, LoadFactSuccessAction, SaveFactSuccessAction
} from './actions';

export type FactsActions =
  LoadFactAction | LoadFactSuccessAction |
  LoadAllFactsAction | LoadAllFactsSuccessAction |
  DeleteAllFactsAction | DeleteAllFactsSuccessAction |
  DeleteFactAction | DeleteFactSuccessAction |
  SaveFactSuccessAction;
