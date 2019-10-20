import { Action } from '@ngrx/store';

import { SecurityActionTypes } from '../security-action.types';

export class LogOutAction implements Action {
  public readonly type = SecurityActionTypes.LogOut;
}
