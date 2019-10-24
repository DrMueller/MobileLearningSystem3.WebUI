import { Action } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '../learning-sessions-action.types';

export class LoadAllLearningSessionsSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadAllLearningSessionsSuccess;

  public constructor(public overview: LearningSession[]) {
  }
}
