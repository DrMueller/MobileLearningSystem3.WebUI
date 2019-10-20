import { Action } from '@ngrx/store';

import { SecurityActionTypes } from '../security-action.types';

export class InitializeUserAction implements Action {
  public readonly type = SecurityActionTypes.InitializeUser;
}
