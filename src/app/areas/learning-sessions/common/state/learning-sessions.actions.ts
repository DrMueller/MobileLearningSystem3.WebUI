
import {
  DeleteAction, DeleteAllAction,
  DeleteAllSuccessAction, DeleteSuccessAction, LoadAllLearningSessionsAction,
  LoadAllLearningSessionsSuccessAction, SaveLearningSessionAction, SaveLearningSessionSuccessAction,
} from './actions';

export type LearningSessionsActions =
  DeleteAction | DeleteSuccessAction |
  DeleteAllAction | DeleteAllSuccessAction |
  LoadAllLearningSessionsAction | LoadAllLearningSessionsSuccessAction |
  SaveLearningSessionAction | SaveLearningSessionSuccessAction;
