
import {
  DeleteAction, DeleteAllLearningSessionsAction, DeleteAllLearningSessionsSuccessAction,
  DeleteSuccessAction, LoadAllLearningSessionsAction, LoadAllLearningSessionsSuccessAction,
  SaveLearningSessionAction, SaveLearningSessionSuccessAction,
} from './actions';
import { LoadLearningSessionSuccessAction } from './actions/load-learning-session-success.action';
import { LoadLearningSessionAction } from './actions/load-learning-session.action';

export type LearningSessionsActions =
  LoadLearningSessionAction | LoadLearningSessionSuccessAction |
  DeleteAction | DeleteSuccessAction |
  DeleteAllLearningSessionsAction | DeleteAllLearningSessionsSuccessAction |
  LoadAllLearningSessionsAction | LoadAllLearningSessionsSuccessAction |
  SaveLearningSessionAction | SaveLearningSessionSuccessAction;
