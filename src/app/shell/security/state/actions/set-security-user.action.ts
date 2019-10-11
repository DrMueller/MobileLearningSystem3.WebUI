import { Action } from '@ngrx/store';

import { SecurityActionTypes } from '../security-action.types';

export class SetSecurityUserAction implements Action {
  public get type(): string {
    return SecurityActionTypes.SetSecurityUser;
  }

  public constructor(public readonly userIsLoggedIn: boolean, public userName: string) {
  }
}
