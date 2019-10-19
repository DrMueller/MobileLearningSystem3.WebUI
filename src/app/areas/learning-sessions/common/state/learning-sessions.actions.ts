import {
  LoadAction, LoadEditAction,
  LoadEditSuccessAction, OverviewLoadSuccesssAction,
  SaveEditAction, SaveEditSuccessAction
} from './actions';

export type LearningSessionsActions =
  LoadAction | OverviewLoadSuccesssAction |
  LoadEditAction | LoadEditSuccessAction |
  SaveEditAction | SaveEditSuccessAction;
