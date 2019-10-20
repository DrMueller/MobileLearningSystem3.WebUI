import {
  DeleteAction, DeleteAllAction,
  DeleteAllSuccessAction, DeleteSuccessAction,
  LoadAction, LoadEditAction, LoadEditSuccessAction,
  LoadRunFactsAction, LoadRunFactsSuccessAction,
  OverviewLoadSuccesssAction, ReshuffleRunFacts, SaveEditAction,
  SaveEditSuccessAction, SelectNextRunFactAction,
  SelectNextSessionRunFactsAction, SelectNextSessionRunFactsSuccessAction,
  SelectPreviousRunFactAction, SelectSessionAction
} from './actions';

export type LearningSessionsActions =
  LoadAction | OverviewLoadSuccesssAction |
  LoadEditAction | LoadEditSuccessAction |
  SaveEditAction | SaveEditSuccessAction |
  DeleteAction | DeleteSuccessAction |
  DeleteAllAction | DeleteAllSuccessAction |
  LoadRunFactsAction | LoadRunFactsSuccessAction |
  SelectSessionAction | SelectNextRunFactAction |
  SelectPreviousRunFactAction | ReshuffleRunFacts |
  SelectNextSessionRunFactsAction | SelectNextSessionRunFactsSuccessAction;
