import { Action } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';

import { LearningSessionsActionTypes } from '..';

export class LoadLearningSessionSuccessAction implements Action {
  public readonly type = LearningSessionsActionTypes.LoadLearningSessionSuccess;

  public constructor(public readonly learningSession: LearningSession) {
  }
}
