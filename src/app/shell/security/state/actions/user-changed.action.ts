import { Action } from '@ngrx/store';

import { SecurityUser } from '../../models';
import { SecurityActionTypes } from '../security-action.types';

export class UserChangedAction implements Action {
  public readonly type = SecurityActionTypes.UserChanged;

  public constructor(public readonly user: SecurityUser) {
  }
}
