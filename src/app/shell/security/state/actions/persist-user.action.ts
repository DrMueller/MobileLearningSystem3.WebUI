import { Action } from '@ngrx/store';

import { SecurityUser } from '../../models';
import { SecurityActionTypes } from '../security-action.types';

export class PersistUserAction implements Action {
  public readonly type = SecurityActionTypes.PersistUser;

  public constructor(public readonly user: SecurityUser) {
  }
}
