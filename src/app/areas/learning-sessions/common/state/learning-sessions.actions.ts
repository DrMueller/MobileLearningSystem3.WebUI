
import {
  DeleteAllLearningSessionsAction, DeleteAllLearningSessionsSuccessAction,
  DeleteLearningSessionAction, DeleteLearningSessionSuccessAction,
  LoadAllLearningSessionsAction, LoadAllLearningSessionsSuccessAction,
  SaveLearningSessionAction, SaveLearningSessionSuccessAction,
} from './actions';
import { LoadLearningSessionSuccessAction } from './actions/load-learning-session-success.action';
import { LoadLearningSessionAction } from './actions/load-learning-session.action';

export type LearningSessionsActions =
  LoadLearningSessionAction | LoadLearningSessionSuccessAction |
  DeleteLearningSessionAction | DeleteLearningSessionSuccessAction |
  DeleteAllLearningSessionsAction | DeleteAllLearningSessionsSuccessAction |
  LoadAllLearningSessionsAction | LoadAllLearningSessionsSuccessAction |
  SaveLearningSessionAction | SaveLearningSessionSuccessAction;
