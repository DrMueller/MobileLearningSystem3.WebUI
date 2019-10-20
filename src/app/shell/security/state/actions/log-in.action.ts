import { Action } from '@ngrx/store';

import { LoginRequest } from '../../models';
import { SecurityActionTypes } from '../security-action.types';

export class LogInAction implements Action {
  public readonly type = SecurityActionTypes.LogIn;

  public constructor(public readonly request: LoginRequest) {
  }
}
